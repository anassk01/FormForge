// fieldParsers.ts

import { FieldParserBase, ParsingContext, Token, ParserError } from './parser-types';
import { ParsedField } from './types';

export class DefaultFieldParser extends FieldParserBase {
    constructor(context: ParsingContext) {
      super(context);
    }
  
    async parse(fieldType: string): Promise<ParsedField> {
      const baseField = await this.parseBaseField(fieldType);
      const options: any = {};
  
      while (await this.context.tokenStream.peek() && !(await this.isNewFieldStart())) {
        const token = await this.context.tokenStream.peek();
        if (!token) break;
  
        switch (token.value.toUpperCase()) {
          case 'REQUIRED':
            baseField.required = true;
            await this.context.tokenStream.consume();
            break;
          case 'DEFAULT':
            await this.context.tokenStream.consume();
            options.default = await this.parseDefaultValue(fieldType);
            break;
          case 'RANGE':
            await this.context.tokenStream.consume();
            options.range = await this.parseRange();
            break;
          case 'MULTILINE':
            if (fieldType === 'TEXT') {
              options.multiline = true;
              await this.context.tokenStream.consume();
            } else {
              throw new ParserError(`MULTILINE is not applicable for ${fieldType} type`, token.line, token.column);
            }
            break;
          default:
            return { ...baseField, options };
        }
      }
  
      return { ...baseField, options };
    }
  
    private async parseBaseField(fieldType: string): Promise<Omit<ParsedField, 'options'>> {
      const name = (await this.ensureToken('IDENTIFIER', undefined, 'Expected field name')).value;
      const description = (await this.ensureToken('STRING', undefined, 'Expected field description')).value;
      return { type: fieldType, name, description, required: false };
    }
  
    private async parseDefaultValue(fieldType: string): Promise<any> {
      const token = await this.context.tokenStream.peek();
      if (!token) throw new ParserError('Unexpected end of input', 0, 0);
  
      switch (fieldType.toUpperCase()) {
        case 'TEXT':
        case 'DATE':
          return (await this.ensureToken('STRING', undefined, `Expected string for ${fieldType} default value`)).value;
        case 'NUMBER':
        case 'SCALE':
          return Number((await this.ensureToken('NUMBER', undefined, `Expected number for ${fieldType} default value`)).value);
        case 'BOOLEAN':
          const value = (await this.ensureToken('IDENTIFIER', undefined, 'Expected boolean value')).value.toLowerCase();
          if (value === 'true') return true;
          if (value === 'false') return false;
          throw new ParserError(`Invalid boolean value: ${value}`, token.line, token.column);
        default:
          throw new ParserError(`DEFAULT is not implemented for ${fieldType} type`, token.line, token.column);
      }
    }
  
    private async parseRange(): Promise<{ min: number; max: number }> {
      const min = Number((await this.ensureToken('NUMBER', undefined, 'Expected minimum value for range')).value);
      const max = Number((await this.ensureToken('NUMBER', undefined, 'Expected maximum value for range')).value);
      return { min, max };
    }
  
    private async isNewFieldStart(): Promise<boolean> {
      const token = await this.context.tokenStream.peek();
      return token !== null && token.type === 'IDENTIFIER' && this.isKnownFieldType(token.value);
    }
  
    private isKnownFieldType(type: string): boolean {
      const knownTypes = ['TEXT', 'NUMBER', 'DATE', 'BOOLEAN', 'SCALE', 'TIMER', 'LIST', 'STOPWATCH', 'TABLE'];
      return knownTypes.includes(type.toUpperCase());
    }
  
    private async ensureToken(expectedType: string, expectedValue: string | undefined, errorMessage: string): Promise<Token> {
      const token = await this.context.tokenStream.peek();
      if (!token || token.type !== expectedType || (expectedValue && token.value.toUpperCase() !== expectedValue.toUpperCase())) {
        throw new ParserError(errorMessage, token?.line || 0, token?.column || 0);
      }
      return this.context.tokenStream.consume();
    }
  }