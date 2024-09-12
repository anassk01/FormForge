// parser-types.ts

import { ParsedField, ValidationError } from './types';
import { AsyncTokenStream } from './async-token-stream';

export interface ErrorRecoveryStrategy {
    recover(error: ParserError, tokenStream: AsyncTokenStream): Promise<void>;
  }
  export abstract class FieldParserBase {
    constructor(protected context: ParsingContext) {}
    abstract parse(fieldType: string): Promise<ParsedField>;
  }

  

export interface Token {
    type: string;
    value: string;
    line: number;
    column: number;
  }

export class ParsingContext {
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

export class ParserError extends Error {
    constructor(
      public message: string,
      public line: number,
      public column: number
    ) {
      super(message);
      this.name = 'ParserError';
    }
  }
export interface FieldTypeConfig {
  name: string;
  parser: new (context: ParsingContext) => FieldParserBase;
  validationRules: ValidationRule[];
}

export interface ValidationRule {
  validate(field: ParsedField): ValidationError[];
}

export interface FieldTypePlugin {
  typeName: string;
  parser: new (context: ParsingContext) => FieldParserBase;
  validationRules?: ValidationRule[];
}

export interface PerformanceMetrics {
  totalParseTime: number;
  parseCount: number;
  cacheHits: number;
  cacheMisses: number;
  errorCount: number;
  fieldParseTime: { [fieldType: string]: number };
}

export enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR
}