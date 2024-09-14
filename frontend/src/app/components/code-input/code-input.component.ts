//src/app/components/code-input/code-input.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, inject, signal, computed, effect, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef, DestroyRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, Subject } from 'rxjs';
import * as monaco from 'monaco-editor';

interface FieldOptions {
  required?: boolean;
  default?: any;
  min?: number;
  max?: number;
  after?: number;
  laps?: number;
  min_laps?: number;
  max_laps?: number;
  [key: string]: any;
}

interface Token {
  type: string;
  value: string;
  line: number;
  column: number;
}

export interface ASTNode {
  type: string;
  name?: string;
  description?: string;
  options?: { [key: string]: any };
  children?: ASTNode[];
  line: number;
  column: number;
  dataType?: string;
}

class ParseError extends Error {
  constructor(message: string, public line: number, public column: number) {
    super(message);
    this.name = 'ParseError';
  }
}

enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR
}

type LogSettings = {
  tokenization: boolean;
  parsing: boolean;
  validation: boolean;
  details: boolean;
};

@Component({
  selector: 'app-code-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="p-4">
      @if (isBrowser()) {
        <div #editorContainer class="editor-container" aria-label="Code Editor"></div>
      } @else {
        <textarea 
          [ngModel]="code()" 
          (ngModelChange)="updateCode($event)" 
          rows="10" 
          cols="50" 
          class="w-full p-2 border rounded"
          aria-label="Code Input">
        </textarea>
      }
      <button mat-raised-button color="primary" (click)="submitCode()" [disabled]="!isValidCode()" aria-label="Interpret Code">
        Interpret Code
      </button>
      @if (isValidating()) {
        <mat-spinner diameter="20" aria-label="Validating"></mat-spinner>
      }
      @if (errorMessage()) {
        <div class="error-message mt-2 text-red-500" role="alert">{{ errorMessage() }}</div>
      }
    </div>
  `,
  styles: [`
    .editor-container {
      height: 400px;
      border: 1px solid #ccc;
      margin-bottom: 10px;
    }
    .error-message {
      font-size: 0.875rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeInputComponent implements AfterViewInit {
  @ViewChild('editorContainer', { static: false }) editorContainer!: ElementRef<HTMLElement>;
  @Output() codeSubmitted = new EventEmitter<string>();

  onSubmit(): void {
    if (this.isValidCode()) {
      this.codeSubmitted.emit(this.code());
    }
  }

  private editor: monaco.editor.IStandaloneCodeEditor | null = null;
  private tokens = signal<Token[]>([]);
  private current = signal(0);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  code = signal('// Enter your code here');
  isValidCode = signal(false);
  isBrowser = computed(() => isPlatformBrowser(this.platformId));
  errorMessage = signal('');
  isValidating = signal(false);

  private logMessages = signal<string[]>([]);
  private logSettings = signal<LogSettings>({
    tokenization: false,
    parsing: false,
    validation: false,
    details: false
  });

  private codeChangeSubject = new Subject<string>();

  private originalCode: string = '';
  private parsedAST: ASTNode | null = null;
  constructor() {
    this.codeChangeSubject.pipe(
      debounceTime(300),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.validateCode();
    });

    effect(() => {
      this.codeChangeSubject.next(this.code());
    });

    // Activate all logs
    this.logSettings.set({
      tokenization: false,
      parsing: false,
      validation: false,
      details: false
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initMonaco();
    }
  }

  private async initMonaco() {
    if (!this.editorContainer) {
      console.error('Editor container not found.');
      return;
    }
  
    // Ensure monaco is loaded only in the browser environment
    if (isPlatformBrowser(this.platformId)) {
      try {
        const monaco = await import('monaco-editor');
  
        this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
          value: this.code(),
          language: 'plaintext',
          theme: 'vs-dark',
          minimap: { enabled: false },
          automaticLayout: true
        });
  
        this.editor.onDidChangeModelContent(() => {
          this.code.set(this.editor?.getValue() || '');
        });
      } catch (error) {
        console.error('Error loading or initializing Monaco editor:', error);
      }
    } else {
      console.warn('Monaco editor is not supported in server-side rendering.');
    }
  }

  updateCode(newCode: string) {
    this.code.set(newCode);
    if (this.editor) {
      this.editor.setValue(newCode);
    }
    this.originalCode = newCode;
    this.codeChangeSubject.next(newCode);
  }
  
  
  private log(category: keyof LogSettings, message: string, data?: any, level: LogLevel = LogLevel.INFO): void {
    if (this.logSettings()[category]) {
      const logMessage = `[${new Date().toISOString()}] [${LogLevel[level]}] [${category.toUpperCase()}] ${message}`;
      // console.log(logMessage, data);
      this.logMessages.update(messages => [...messages, logMessage + (data ? ` ${JSON.stringify(data)}` : '')]);
    }
  }

  setLogSettings(settings: Partial<LogSettings>) {
    this.logSettings.update(current => ({ ...current, ...settings }));
  }


  submitCode() {
    if (this.isValidCode()) {
      this.log('validation', 'Submitting code');
      this.codeSubmitted.emit(this.code());
    }
  }

  
  onCodeSubmitted(code: string): void {
    this.originalCode = code;
    this.codeSubmitted.emit(code);
  }

  getOriginalCode(): string {
    return this.originalCode;
  }


  getLogs(): string[] {
    return this.logMessages();
  }

  private validateCode() {
    console.log('Validating code:', this.code());
    this.log('validation', 'Starting code validation');
    this.isValidating.set(true);
    this.isValidCode.set(false);
    this.errorMessage.set('');
    this.tokens.set([]);
    this.current.set(0);

    try {
      this.tokenize(this.code());
      if (this.tokens().length > 0) {
        const ast = this.parse();
        this.log('parsing', 'Parsed AST', ast);
        this.isValidCode.set(true);
      } else {
        this.isValidCode.set(false);
      }
    } catch (error) {
      if (error instanceof ParseError) {
        this.errorMessage.set(`${error.message} (Line: ${error.line}, Column: ${error.column})`);
      } else if (error instanceof Error) {
        this.errorMessage.set(error.message);
      } else {
        this.errorMessage.set('An unknown error occurred');
      }
      this.log('validation', 'Validation error', { error: this.errorMessage() });
      this.isValidCode.set(false);
    } finally {
      this.isValidating.set(false);
      this.cdr.markForCheck();
    }
  }


  private tokenize(input: string): void {
    this.log('tokenization', 'Starting tokenization');
    const tokenPatterns = [
      { regex: /^\/\/.*/, type: 'COMMENT' },
      { regex: /^(ENTRY|TEXT|NUMBER|DATE|BOOLEAN|SCALE|LIST|TABLE|TIMER|STOPWATCH|COLUMN|WORK|BREAK|SESSIONS|LONG_BREAK|SESSION_LABELS|AFTER)\b/, type: 'KEYWORD' },
      { regex: /^(REQUIRED|DEFAULT|RANGE|MIN|MAX|LAPS|MIN_LAPS|MAX_LAPS|MULTILINE)\b/, type: 'OPTION' },
      { regex: /^"[^"]*"/, type: 'STRING' },
      { regex: /^[WB](?=\s)/, type: 'PHASE_IDENTIFIER' }, // New pattern for W and B
      { regex: /^[a-zA-Z_]\w*/, type: 'IDENTIFIER' },
      { regex: /^\d+/, type: 'NUMBER' },
      { regex: /^[{}]/, type: 'BRACE' },
      { regex: /^\s+/, type: 'WHITESPACE' },
    ];

  
    let pos = 0;
    let line = 1;
    let column = 1;
    const newTokens: Token[] = [];
  
    while (pos < input.length) {
      let match = null;
      for (const pattern of tokenPatterns) {
        match = input.slice(pos).match(pattern.regex);
        if (match) {
          if (pattern.type !== 'WHITESPACE' && pattern.type !== 'COMMENT') {
            const token = {
              type: pattern.type,
              value: match[0],
              line,
              column
            };
            newTokens.push(token);
            this.log('tokenization', `Token found: ${JSON.stringify(token)}`);
            
            // Additional logging for LONG_BREAK
            // if (token.value === 'LONG_BREAK') {
            //   console.log(`LONG_BREAK token found: ${JSON.stringify(token)}`);
            // }
          }
          if (match[0].includes('\n')) {
            const lines = match[0].split('\n');
            line += lines.length - 1;
            column = lines[lines.length - 1].length + 1;
          } else {
            column += match[0].length;
          }
          pos += match[0].length;
          break;
        }
      }
      if (!match) {
        const errorMessage = `Unexpected character: ${input[pos]}`;
        this.log('tokenization', errorMessage, null, LogLevel.ERROR);
        console.error(errorMessage, `at line ${line}, column ${column}`);
        throw new ParseError(errorMessage, line, column);
      }
    }
  
    this.tokens.set(newTokens);
    this.log('tokenization', 'Tokenization complete', { tokenCount: newTokens.length });
    // console.log('Tokenization complete. Tokens:', newTokens);
  }
  private parse(): ASTNode {
    this.log('parsing', 'Starting parsing');
    try {
      const ast = this.parseEntry();
      this.log('parsing', 'Parsed AST', ast);
      return ast;
    } catch (error) {
      if (error instanceof ParseError) {
        throw error;
      } else {
        throw new ParseError('Unexpected end of input', this.tokens()[this.current() - 1]?.line || 0, this.tokens()[this.current() - 1]?.column || 0);
      }
    }
  }
  
  // This method can be used to get the parsed AST if needed
  getParsedAST(): ASTNode | null {
    return this.parsedAST;
  }


  private parseEntry(): ASTNode {
    this.log('parsing', 'Parsing ENTRY');
    const token = this.consume('KEYWORD', 'ENTRY');
    const name = this.consume('STRING').value.slice(1, -1); // Remove quotes
    this.consume('BRACE', '{');
    
    const children = [];
    while (this.peek().type !== 'BRACE' || this.peek().value !== '}') {
      children.push(this.parseField());
    }
    
    this.consume('BRACE', '}');
    
    return {
      type: 'ENTRY',
      name,
      children,
      line: token.line,
      column: token.column
    };
  }
  
  
  private parseField(): ASTNode {
    this.log('parsing', 'Parsing field');
    const token = this.consume('KEYWORD');
    const fieldType = token.value;
    
    try {
      switch (fieldType) {
        case 'TEXT':
        case 'NUMBER':
        case 'DATE':
        case 'BOOLEAN':
        case 'SCALE':
        case 'STOPWATCH':
          return this.parseSimpleField(fieldType);
        case 'LIST':
        case 'TABLE':
          return this.parseComplexField(fieldType);
        case 'TIMER':
          return this.parseTimerField();
        default:
          throw new ParseError(`Unexpected field type: ${fieldType}`, token.line, token.column);
      }
    } catch (error: unknown) {
      if (error instanceof ParseError) {
        throw error;
      } else if (error instanceof Error) {
        throw new ParseError(`Error parsing ${fieldType} field: ${error.message}`, token.line, token.column);
      } else {
        throw new ParseError(`Unknown error parsing ${fieldType} field`, token.line, token.column);
      }
    }
  }
  

  private parseTimerField(): ASTNode {
    const name = this.consume('IDENTIFIER').value;
    const description = this.consume('STRING').value.slice(1, -1);
    const options: { [key: string]: any } = {};
    
    this.consume('BRACE', '{');
    

    while (this.peek().type !== 'BRACE' || this.peek().value !== '}') {
      const token = this.consume('KEYWORD');
      this.log('parsing', `Parsing TIMER field keyword: ${token.value}`);
      switch (token.value) {
        case 'WORK':
          options['workDuration'] = this.parseNumber(); // Keep in seconds
          break;
        case 'BREAK':
          options['breakDuration'] = this.parseNumber(); // Keep in seconds
          break;
        case 'SESSIONS':
          options['sessions'] = this.parseNumber();
          break;
          case 'SESSION_LABELS':
            options['sessionLabels'] = this.parseSessionLabels();
            break;
        case 'LONG_BREAK':
          options['longBreakDuration'] = this.parseNumber(); // Keep in seconds
          this.consume('KEYWORD', 'AFTER');
          options['longBreakInterval'] = this.parseNumber();
          break;
        default:
          throw new ParseError(`Unexpected keyword in TIMER: ${token.value}`, token.line, token.column);
      }
    }
    
    this.consume('BRACE', '}');
    
    const lastToken = this.tokens()[this.current() - 1];
    return { 
      type: 'TIMER', 
      name, 
      description, 
      options, 
      line: lastToken.line, 
      column: lastToken.column 
    };
  }
  
  private parseSessionLabels(): { [key: number]: { work?: string, break?: string } } {
    const labels: { [key: number]: { work?: string, break?: string } } = {};
    this.consume('BRACE', '{');
    while (this.peek().type !== 'BRACE' || this.peek().value !== '}') {
      const sessionNumberToken = this.parseNumber();
      const sessionNumber = Number(sessionNumberToken.value);
      const phaseIdentifierToken = this.consume('PHASE_IDENTIFIER');
      const phaseIdentifier = phaseIdentifierToken.value;
      const label = this.consume('STRING').value.slice(1, -1);
      
      if (!labels[sessionNumber]) {
        labels[sessionNumber] = {};
      }
      
      if (phaseIdentifier === 'W') {
        labels[sessionNumber].work = label;
      } else if (phaseIdentifier === 'B') {
        labels[sessionNumber].break = label;
      } else {
        throw new ParseError(
          `Unexpected phase identifier: ${phaseIdentifier}`,
          phaseIdentifierToken.line,
          phaseIdentifierToken.column
        );
      }
    }
    this.consume('BRACE', '}');
    return labels;
  }

  private parseNumber(): Token {
    return this.consume('NUMBER');
  }
  

  private parseSimpleField(type: string): ASTNode {
    this.log('parsing', `Parsing simple field: ${type}`);
    const name = this.consume('IDENTIFIER').value;
    const description = this.consume('STRING').value.slice(1, -1);
    const options = this.parseOptions();
    
    const lastToken = this.tokens()[this.current() - 1];
    return { type, name, description, options, line: lastToken.line, column: lastToken.column };
  }

  private parseComplexField(type: string): ASTNode {
    this.log('parsing', `Parsing complex field: ${type}`);
    const name = this.consume('IDENTIFIER').value;
    const description = this.consume('STRING').value.slice(1, -1);
    const options = this.parseOptions();
    
    this.consume('BRACE', '{');
    const children = [];
    
    while (this.peek().type !== 'BRACE' || this.peek().value !== '}') {
      if (type === 'TABLE') {
        children.push(this.parseColumn());
      } else {
        children.push(this.parseField());
      }
    }
    
    this.consume('BRACE', '}');
    
    const lastToken = this.tokens()[this.current() - 1];
    return { type, name, description, options, children, line: lastToken.line, column: lastToken.column };
  }
  

  private parseColumn(): ASTNode {
    this.log('parsing', 'Parsing COLUMN');
    this.consume('KEYWORD', 'COLUMN');
    const dataType = this.consume('KEYWORD').value;
    this.log('details', `COLUMN data type: ${dataType}`);
    const name = this.consume('IDENTIFIER').value;
    this.log('details', `COLUMN name: ${name}`);
    const description = this.consume('STRING').value.slice(1, -1);
    this.log('details', `COLUMN description: ${description}`);
    const options = this.parseOptions();
    this.log('details', `COLUMN options:`, options);
    
    const lastToken = this.tokens()[this.current() - 1];
    return { 
      type: 'COLUMN', 
      dataType, 
      name, 
      description, 
      options, 
      line: lastToken.line, 
      column: lastToken.column 
    };
  }

  private parseTimerSetting(): ASTNode {
    this.log('parsing', 'Parsing timer setting');
    const type = this.consume('KEYWORD').value;
    const value = parseInt(this.consume('NUMBER').value, 10);
    const options = type === 'LONG_BREAK' ? this.parseOptions() : {};
    
    const lastToken = this.tokens()[this.current() - 1];
    return { 
      type, 
      name: type.toLowerCase(),
      options: { ...options, value }, 
      line: lastToken.line, 
      column: lastToken.column 
    };
  }

  private parseOptions(): { [key: string]: any } {
    this.log('parsing', 'Parsing options');
    const options: { [key: string]: any } = {};
    
    while (this.peek().type === 'OPTION' || (this.peek().type === 'KEYWORD' && ['RANGE', 'MIN', 'MAX'].includes(this.peek().value))) {
      const optionToken = this.consume(this.peek().type);
      const option = optionToken.value;
      this.log('details', `Parsing option: ${option}`);
      
      switch (option) {
        case 'REQUIRED':
          options['required'] = true;
          break;
        case 'MULTILINE':
          options['multiline'] = true;
          break;
        case 'DEFAULT':
          options['default'] = this.parseDefaultValue();
          break;
        case 'RANGE':
          const minToken = this.consume('NUMBER');
          const maxToken = this.consume('NUMBER');
          options['range'] = {
            min: parseInt(minToken.value, 10),
            max: parseInt(maxToken.value, 10)
          };
          break;
        case 'MIN':
          options['min'] = parseInt(this.consume('NUMBER').value, 10);
          break;
        case 'MAX':
          options['max'] = parseInt(this.consume('NUMBER').value, 10);
          break;
        case 'LAPS':
          options['laps'] = parseInt(this.consume('NUMBER').value, 10);
          break;
          case 'MIN_LAPS':
            options['minLaps'] = parseInt(this.consume('NUMBER').value, 10);
            break;
          case 'MAX_LAPS':
            options['maxLaps'] = parseInt(this.consume('NUMBER').value, 10);
            break;
        case 'AFTER':
          options['after'] = parseInt(this.consume('NUMBER').value, 10);
          break;
        default:
          throw new ParseError(`Unexpected option: ${option}`, optionToken.line, optionToken.column);
      }
    }
    
    return options;
  }

  private parseDefaultValue(): any {
    this.log('parsing', 'Parsing default value');
    const nextToken = this.peek();
    switch (nextToken.type) {
      case 'NUMBER':
        return parseInt(this.consume('NUMBER').value, 10);
      case 'STRING':
        return this.consume('STRING').value.slice(1, -1);
      case 'IDENTIFIER':
        const value = this.consume('IDENTIFIER').value.toLowerCase();
        return value === 'true' ? true : value === 'false' ? false : value;
      default:
        throw new ParseError(`Unexpected default value type: ${nextToken.type}`, nextToken.line, nextToken.column);
    }
  }

  private consume(expectedType: string, expectedValue?: string): Token {
    const tokenArray = this.tokens();
    const currentIndex = this.current();
    if (currentIndex >= tokenArray.length) {
      const lastToken = tokenArray[tokenArray.length - 1];
      throw new ParseError('Unexpected end of input', lastToken.line, lastToken.column);
    }
    const token = tokenArray[currentIndex];
    if (token.type !== expectedType) {
      throw new ParseError(`Expected token type ${expectedType}, but got ${token.type}`, token.line, token.column);
    }
    if (expectedValue && token.value !== expectedValue) {
      throw new ParseError(`Expected token value ${expectedValue}, but got ${token.value}`, token.line, token.column);
    }
    this.current.set(currentIndex + 1);
    this.log('details', `Consumed token: ${token.type} ${token.value}`);
    return token;
  }

  private peek(): Token {
    const tokenArray = this.tokens();
    const currentIndex = this.current();
    return tokenArray[currentIndex] || { type: 'EOF', value: '', line: -1, column: -1 };
  }

}