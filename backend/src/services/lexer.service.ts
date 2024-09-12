export type TokenType = 
  'KEYWORD' | 'IDENTIFIER' | 'NUMBER' | 'STRING' | 'CHAR' | 'EOF' |
  'TABLE_START' | 'TABLE_END' | 'COLUMN' | 'ROW' | 'PHASE_IDENTIFIER';

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  column: number;
}

export class LexerService {
  constructor(input: string) {
    this.input = input;
  }
  getInput(): string {
    return this.input;
  }
  private input: string;
  private position: number = 0;
  private line: number = 1;
  private column: number = 1;

  private keywords: Set<string> = new Set([
    'ENTRY', 'REQUIRED', 'DEFAULT', 'RANGE', 'MIN', 'MAX',
    'LIST', 'TABLE', 'COLUMN', 'END', 'MULTILINE',   
    'STOPWATCH', 'TIMER', 'WORK', 'BREAK', 'SESSIONS', 'LONG_BREAK', 'AFTER',
    'SESSION_LABELS'
  ]);



  async nextToken(): Promise<Token> {
    return new Promise(resolve => {
      setImmediate(() => {
        resolve(this.synchronousNextToken());
      });
    });
  }

  
  private synchronousNextToken(): Token {
    this.skipWhitespace();

    if (this.position >= this.input.length) {
      return this.createToken('EOF', '');
    }

    const char = this.input[this.position];

    if (this.isAlpha(char)) {
      return this.readIdentifierOrKeyword();
    }

    if (this.isDigit(char)) {
      return this.readNumber();
    }

    if (char === '"') {
      return this.readString();
    }

    // Handle curly braces
    if (char === '{' || char === '}') {
      this.position++;
      this.column++;
      return this.createToken('CHAR', char);
    }

    // Handle other single-character tokens
    this.position++;
    this.column++;
    return this.createToken('CHAR', char);
  }

  private skipWhitespace(): void {
    while (this.position < this.input.length && /\s/.test(this.input[this.position])) {
      if (this.input[this.position] === '\n') {
        this.line++;
        this.column = 1;
      } else {
        this.column++;
      }
      this.position++;
    }
  }

  private readIdentifierOrKeyword(): Token {
    const start = this.position;
    while (this.position < this.input.length && this.isAlphaNumeric(this.input[this.position])) {
      this.position++;
      this.column++;
    }
    const value = this.input.slice(start, this.position);
    
    if (this.keywords.has(value.toUpperCase())) {
      return this.createToken('KEYWORD', value);
    }
    return this.createToken('IDENTIFIER', value);
  }

  private readNumber(): Token {
    const start = this.position;
    while (this.position < this.input.length && this.isDigit(this.input[this.position])) {
      this.position++;
      this.column++;
    }
    // Handle decimal numbers
    if (this.input[this.position] === '.' && this.isDigit(this.input[this.position + 1])) {
      this.position++;
      this.column++;
      while (this.position < this.input.length && this.isDigit(this.input[this.position])) {
        this.position++;
        this.column++;
      }
    }
    return this.createToken('NUMBER', this.input.slice(start, this.position));
  }

  private readString(): Token {
    const start = this.position;
    this.position++; // Skip the opening quote
    this.column++;

    while (this.position < this.input.length && this.input[this.position] !== '"') {
      if (this.input[this.position] === '\n') {
        this.line++;
        this.column = 1;
      } else {
        this.column++;
      }
      this.position++;
    }

    if (this.position >= this.input.length) {
      throw new Error(`Unterminated string at line ${this.line}, column ${this.column}`);
    }

    this.position++; // Skip the closing quote
    this.column++;

    const value = this.input.slice(start, this.position);
    return this.createToken('STRING', value);
  }



  private isAlpha(char: string): boolean {
    return /[a-zA-Z_]/.test(char);
  }

  private isDigit(char: string): boolean {
    return /[0-9]/.test(char);
  }

  private isAlphaNumeric(char: string): boolean {
    return this.isAlpha(char) || this.isDigit(char);
  }

  private createToken(type: TokenType, value: string): Token {
    return { type, value, line: this.line, column: this.column - value.length };
  }
}

export class LexerError extends Error {
  constructor(message: string, public line: number, public column: number) {
    super(`${message} at line ${line}, column ${column}`);
    this.name = 'LexerError';
  }
}