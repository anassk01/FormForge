
import { LexerService } from './lexer.service';
import { AsyncTokenStream } from './async-token-stream';
import { ConfigManager, ParserConfig } from './config';
import { ErrorRecoverySystem } from './error-recovery-system';
import { Logger } from './logger';
import { ParserCache } from './parser-cache';
import { PerformanceMonitor } from './performance-monitor';
import { PluginManager } from './plugin';
import { Validator } from './validator';
import { createHash } from 'crypto';
import { 
  FieldTypeConfig, 
  FieldTypePlugin, 
  ParserError, 
  PerformanceMetrics, 
  LogLevel,
  ErrorRecoveryStrategy
} from './parser-types';
import { 
  ParsedStructure, 
  ParsedField, 
  ListFieldOptions, 
  TableFieldOptions, 
  ColumnFieldOptions, 
  ValidationError,
  StopwatchFieldOptions, 
  TimerFieldOptions 
} from './types';

export class AsyncParserService {
  private context: AsyncParsingContext;
  private pluginManager: PluginManager;
  private validator: Validator;
  private configManager: ConfigManager;
  private cache: ParserCache;
  private errorRecoverySystem: ErrorRecoverySystem;
  private performanceMonitor: PerformanceMonitor;
  private logger: Logger;

  constructor(private input: string, config: ParserConfig, cacheSize: number = 100) {
    const lexer = new LexerService(input);
    this.context = new AsyncParsingContext(new AsyncTokenStream(lexer));
    this.pluginManager = new PluginManager();
    this.validator = new Validator();
    this.configManager = new ConfigManager(config);
    this.cache = new ParserCache(cacheSize);
    this.errorRecoverySystem = new ErrorRecoverySystem();
    this.performanceMonitor = new PerformanceMonitor();
    this.logger = Logger.getInstance();
    this.initializeFromConfig();
  }

  private initializeFromConfig(): void {
    this.configManager.getAllFieldTypeConfigs().forEach(fieldTypeConfig => {
      this.registerFieldType(fieldTypeConfig);
    });
  }

  private registerFieldType(fieldTypeConfig: FieldTypeConfig): void {
    const plugin: FieldTypePlugin = {
      typeName: fieldTypeConfig.name,
      parser: fieldTypeConfig.parser,
      validationRules: fieldTypeConfig.validationRules
    };
    this.pluginManager.registerPlugin(plugin);
    fieldTypeConfig.validationRules.forEach(rule => this.validator.addRule(rule));
  }

  async parse(): Promise<ParsedStructure> {
    await this.context.tokenStream.initialize();
    const parseStartTime = this.performanceMonitor.startParse();
    this.logger.info('Starting parsing process');
    const cacheKey = this.generateCacheKey(this.input);
    const cachedResult = this.cache.get(cacheKey);
    
    if (cachedResult) {
      this.logger.debug('Cache hit, returning cached result');
      this.performanceMonitor.recordCacheHit();
      this.performanceMonitor.endParse(parseStartTime);
      return cachedResult;
    }

    this.logger.debug('Cache miss, parsing input');
    this.performanceMonitor.recordCacheMiss();
    
    try {
      const result = await this.doParse();
      this.cache.set(cacheKey, result);
      this.performanceMonitor.endParse(parseStartTime);
      this.logger.info('Parsing completed successfully');
      return result;
    } catch (error) {
      this.performanceMonitor.recordError();
      if (error instanceof ParserError) {
        this.logger.error('ParserError encountered:', error.message);
        this.context.addError(error);
      } else {
        this.logger.error('Unexpected error during parsing:', error);
      }
      this.performanceMonitor.endParse(parseStartTime);
      return { entryName: '', fields: [], validationErrors: [] };
    }
  }

  private async doParse(): Promise<ParsedStructure> {
    this.logger.debug('Starting doParse method');
    const entryName = await this.parseEntry();
    const fields: ParsedField[] = [];
    const validationErrors: ValidationError[] = [];

    while (await this.context.tokenStream.peek() && !(await this.context.tokenStream.match('CHAR', '}'))) {
      try {
        const field = await this.parseNextField();
        fields.push(field);
        
        const fieldErrors = this.validator.validate(field);
        if (fieldErrors.length > 0) {
          this.logger.warn('Validation errors for field:', field.name, fieldErrors);
          validationErrors.push(...fieldErrors);
        }
      } catch (error) {
        if (error instanceof ParserError) {
          this.logger.error(`Error parsing field: ${error.message}`);
          this.context.addError(error);
          this.performanceMonitor.recordError();
          await this.errorRecoverySystem.recoverFromError(error, this.context.tokenStream);
        } else {
          throw error;
        }
      }
    }

    this.logger.debug('Completed doParse method');
    return { entryName, fields, validationErrors };
  }

  private async parseEntry(): Promise<string> {
    try {
      const nextToken = await this.context.tokenStream.peek();
      this.logger.debug(`Next token: ${JSON.stringify(nextToken)}`);
  
      if (!(await this.context.tokenStream.match('KEYWORD', 'ENTRY'))) {
        this.logger.error("Failed to match 'ENTRY' keyword");
        throw new ParserError("Expected 'ENTRY' keyword at the start", nextToken?.line || 0, nextToken?.column || 0);
      }
  
      const entryToken = await this.context.tokenStream.consume();
      this.logger.debug(`Entry token: ${JSON.stringify(entryToken)}`);
  
      if (!entryToken || entryToken.type !== 'STRING') {
        this.logger.error(`Invalid entry token: ${JSON.stringify(entryToken)}`);
        throw new ParserError("Expected string for ENTRY name", entryToken?.line || 0, entryToken?.column || 0);
      }
  
      const entryName = entryToken.value.slice(1, -1); // Remove quotes
      this.logger.debug(`Parsed entry name: ${entryName}`);
  
      if (!(await this.context.tokenStream.match('CHAR', '{'))) {
        this.logger.error("Failed to match '{' after ENTRY name");
        throw new ParserError("Expected '{' after ENTRY name", entryToken.line, entryToken.column);
      }
  
      return entryName;
    } catch (error) {
      if (error instanceof ParserError) {
        this.logger.error(`ParserError in parseEntry: ${error.message}`);
        await this.errorRecoverySystem.recoverFromError(error, this.context.tokenStream);
        return 'Default Entry Name';
      }
      throw error;
    }
  }

  private async parseNextField(): Promise<ParsedField> {
    const token = await this.context.tokenStream.peek();
    if (!token) {
      throw new ParserError('Unexpected end of input', 0, 0);
    }
    const fieldType = token.value.toUpperCase();
    await this.context.tokenStream.consume(); // Consume the field type token

    switch (fieldType) {
      case 'TEXT':
      case 'DATE':
      case 'BOOLEAN':
      case 'SCALE':
      case 'NUMBER':
        return this.parseSimpleField(fieldType);
      case 'TIMER':
        return this.parseTimerField();
      case 'LIST':
        return this.parseListField();
      case 'STOPWATCH':
        return this.parseStopwatchField();
      case 'TABLE':
        return this.parseTableField();
      default:
        throw new ParserError(`Unknown field type: ${fieldType}`, token.line, token.column);
    }
  }

  private async parseSimpleField(type: string): Promise<ParsedField> {
    const name = (await this.context.tokenStream.consume()).value;
    const description = this.removeQuotes((await this.context.tokenStream.consume()).value);
    let required = false;
    const options: any = {};

    while (await this.context.tokenStream.peek() && !(await this.isNewFieldStart())) {
      const token = await this.context.tokenStream.peek();
      if (!token) break;

      switch (token.value.toUpperCase()) {
        case 'REQUIRED':
          required = true;
          await this.context.tokenStream.consume();
          break;
        case 'DEFAULT':
          await this.context.tokenStream.consume();
          options.default = await this.parseDefaultValue(type);
          break;
        case 'RANGE':
          await this.context.tokenStream.consume();
          options.range = await this.parseRange();
          break;
        case 'MULTILINE':
          if (type === 'TEXT') {
            options.multiline = true;
            await this.context.tokenStream.consume();
          } else {
            throw new ParserError(`MULTILINE is not applicable for ${type} type`, token.line, token.column);
          }
          break;
        default:
          return { type, name, description, required, options };
      }
    }

    return { type, name, description, required, options };
  }



  private async parseRange(): Promise<{ min: number; max: number }> {
    const min = Number((await this.context.tokenStream.consume()).value);
    const max = Number((await this.context.tokenStream.consume()).value);
    return { min, max };
  }
  
  private async parseTimerField(): Promise<ParsedField> {
    const name = (await this.context.tokenStream.consume()).value;
    const description = this.removeQuotes((await this.context.tokenStream.consume()).value);
    const options: TimerFieldOptions = {
      workDuration: 0,
      breakDuration: 0,
      sessions: 0,
      longBreakDuration: undefined,
      longBreakInterval: undefined,
      sessionLabels: {}
    };

    await this.context.tokenStream.match('CHAR', '{');
    while (!(await this.context.tokenStream.match('CHAR', '}'))) {
      const token = await this.context.tokenStream.consume();
      switch (token.value.toUpperCase()) {
        case 'WORK':
          options.workDuration = Number((await this.context.tokenStream.consume()).value) * 60000;
          break;
        case 'BREAK':
          options.breakDuration = Number((await this.context.tokenStream.consume()).value) * 60000;
          break;
        case 'SESSIONS':
          options.sessions = Number((await this.context.tokenStream.consume()).value);
          break;
        case 'LONG_BREAK':
          options.longBreakDuration = Number((await this.context.tokenStream.consume()).value) * 60000;
          await this.context.tokenStream.match('KEYWORD', 'AFTER');
          options.longBreakInterval = Number((await this.context.tokenStream.consume()).value);
          break;
        case 'SESSION_LABELS':
          options.sessionLabels = await this.parseSessionLabels();
          break;
        default:
          throw new ParserError(`Unexpected token in TIMER field: ${token.value}`, token.line, token.column);
      }
    }

    return { type: 'TIMER', name, description, required: false, options };
  }
  private async parseSessionLabels(): Promise<{ [key: number]: { work?: string; break?: string } }> {
    const labels: { [key: number]: { work?: string; break?: string } } = {};
    await this.context.tokenStream.match('CHAR', '{');

    while (!(await this.context.tokenStream.match('CHAR', '}'))) {
      const sessionNumber = Number((await this.context.tokenStream.consume()).value);
      const phaseToken = await this.context.tokenStream.consume();
      const labelToken = await this.context.tokenStream.consume();

      if (!labels[sessionNumber]) {
        labels[sessionNumber] = {};
      }

      if (phaseToken.value === 'W') {
        labels[sessionNumber].work = labelToken.value.slice(1, -1); // Remove quotes
      } else if (phaseToken.value === 'B') {
        labels[sessionNumber].break = labelToken.value.slice(1, -1); // Remove quotes
      } else {
        throw new ParserError(`Unexpected phase identifier: ${phaseToken.value}`, phaseToken.line, phaseToken.column);
      }
    }

    return labels;
  }
  private async parseListField(): Promise<ParsedField> {
    const name = (await this.context.tokenStream.consume()).value;
    const description = this.removeQuotes((await this.context.tokenStream.consume()).value);
    const options: ListFieldOptions = { minItems: 0, maxItems: Infinity, listFields: [] };

    while (await this.context.tokenStream.peek() && (await this.context.tokenStream.peek())!.type !== 'CHAR') {
      if (await this.context.tokenStream.match('KEYWORD', 'MIN')) {
        options.minItems = Number((await this.context.tokenStream.consume()).value);
      } else if (await this.context.tokenStream.match('KEYWORD', 'MAX')) {
        options.maxItems = Number((await this.context.tokenStream.consume()).value);
      } else {
        break;
      }
    }

    await this.context.tokenStream.match('CHAR', '{');
    while (!(await this.context.tokenStream.match('CHAR', '}'))) {
      options.listFields.push(await this.parseNextField());
    }

    return { type: 'LIST', name, description, required: false, options };
  }


  private async parseStopwatchField(): Promise<ParsedField> {
    const name = (await this.context.tokenStream.consume()).value;
    const description = this.removeQuotes((await this.context.tokenStream.consume()).value);
    const options: StopwatchFieldOptions = { laps: undefined, minLaps: undefined, maxLaps: undefined };

    while (await this.context.tokenStream.peek() && !(await this.isNewFieldStart())) {
      const token = await this.context.tokenStream.peek();
      if (!token) break;

      switch (token.value.toUpperCase()) {
        case 'LAPS':
          await this.context.tokenStream.consume();
          options.laps = Number((await this.context.tokenStream.consume()).value);
          break;
        case 'MIN_LAPS':
          await this.context.tokenStream.consume();
          options.minLaps = Number((await this.context.tokenStream.consume()).value);
          break;
        case 'MAX_LAPS':
          await this.context.tokenStream.consume();
          options.maxLaps = Number((await this.context.tokenStream.consume()).value);
          break;
        default:
          return { type: 'STOPWATCH', name, description, required: false, options };
      }
    }

    return { type: 'STOPWATCH', name, description, required: false, options };
  }

  private async parseTableField(): Promise<ParsedField> {
    const name = (await this.context.tokenStream.consume()).value;
    const description = this.removeQuotes((await this.context.tokenStream.consume()).value);
    const options: TableFieldOptions = { columns: [] };

    await this.context.tokenStream.match('CHAR', '{');
    while (!(await this.context.tokenStream.match('CHAR', '}'))) {
      if (await this.context.tokenStream.match('KEYWORD', 'COLUMN')) {
        options.columns.push(await this.parseColumnField());
      } else {
        throw new ParserError("Expected 'COLUMN' keyword in TABLE definition", 0, 0);
      }
    }

    return { type: 'TABLE', name, description, required: false, options };
  }
  private async parseColumnField(): Promise<ParsedField> {
    const type = (await this.context.tokenStream.consume()).value.toUpperCase();
    const name = (await this.context.tokenStream.consume()).value;
    const description = this.removeQuotes((await this.context.tokenStream.consume()).value);
    
    const options: ColumnFieldOptions = {};
    let required = false;

    while (await this.context.tokenStream.peek() && !(await this.isNewColumnStart())) {
      const token = await this.context.tokenStream.peek();
      if (!token) break;

      switch (token.value.toUpperCase()) {
        case 'REQUIRED':
          required = true;
          await this.context.tokenStream.consume();
          break;
        case 'RANGE':
          await this.context.tokenStream.consume();
          options.range = await this.parseRange();
          break;
        case 'DEFAULT':
          await this.context.tokenStream.consume();
          options.default = await this.parseDefaultValue(type);
          break;
        default:
          return { type, name, description, required, options };
      }
    }

    return { type, name, description, required, options };
  }


  private async parseBaseField(type: string): Promise<Omit<ParsedField, 'options'>> {
    const name = (await this.context.tokenStream.consume()).value;
    const descriptionToken = await this.context.tokenStream.consume();
    const description = this.removeQuotes(descriptionToken.value);
    let required = false;
    return { type, name, description, required };
  }
  private removeQuotes(str: string): string {
    return str.replace(/^"|"$/g, '');
  }
  private async parseDefaultValue(type: string): Promise<any> {
    const token = await this.context.tokenStream.consume();
    switch (type.toUpperCase()) {
      case 'TEXT':
        return this.removeQuotes(token.value);
      case 'NUMBER':
      case 'SCALE':
        return Number(token.value);
      case 'BOOLEAN':
        return token.value.toLowerCase() === 'true';
      default:
        throw new ParserError(`DEFAULT is not implemented for ${type} type`, token.line, token.column);
    }
  }


  private async isNewFieldStart(): Promise<boolean> {
    const token = await this.context.tokenStream.peek();
    return token !== null && token.type === 'KEYWORD' && this.isKnownFieldType(token.value);
  }

  private async isNewColumnStart(): Promise<boolean> {
    const token = await this.context.tokenStream.peek();
    return token?.type === 'KEYWORD' && token.value.toUpperCase() === 'COLUMN';
  }

  private isKnownFieldType(type: string): boolean {
    return this.pluginManager.getPlugin(type.toUpperCase()) !== undefined;
  }

  private generateCacheKey(input: string): string {
    return createHash('md5').update(input).digest('hex');
  }

  public registerCustomFieldType(fieldTypeConfig: FieldTypeConfig): void {
    this.registerFieldType(fieldTypeConfig);
  }

  public registerErrorRecoveryStrategy(name: string, strategy: ErrorRecoveryStrategy): void {
    this.errorRecoverySystem.registerStrategy(name, strategy);
  }

  public getPerformanceMetrics(): PerformanceMetrics {
    return this.performanceMonitor.getMetrics();
  }

  public resetPerformanceMetrics(): void {
    this.performanceMonitor.reset();
  }

  public setLogLevel(level: LogLevel): void {
    this.logger.setLevel(level);
  }

  public clearCache(): void {
    this.cache.clear();
  }

  public getCacheSize(): number {
    return this.cache.getSize();
  }
}

class AsyncParsingContext {
  constructor(
    public readonly tokenStream: AsyncTokenStream,
    public readonly errors: ParserError[] = []
  ) {}

  addError(error: ParserError): void {
    this.errors.push(error);
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }
}



// Example usage:
// const inputStream = fs.createReadStream('large-input-file.txt');
// const config: ParserConfig = { /* configuration options */ };
// const parserService = new AsyncParserService(inputStream, config, 200);
// parserService.setLogLevel(LogLevel.DEBUG);
// parserService.parse(inputString).then(result => console.log(result));