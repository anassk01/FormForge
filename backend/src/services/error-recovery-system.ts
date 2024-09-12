import { Token, TokenType } from './lexer.service';
import { AsyncTokenStream } from './async-token-stream';
import { ParserError } from './parser-types';

export interface ErrorRecoveryStrategy {
  recover(error: ParserError, tokenStream: AsyncTokenStream): Promise<void>;
}

class SkipToNextFieldStrategy implements ErrorRecoveryStrategy {
  async recover(error: ParserError, tokenStream: AsyncTokenStream): Promise<void> {
    console.log(`Recovering from error: ${error.message}`);
    while (await tokenStream.peek()) {
      const token = await tokenStream.peek();
      if (token && this.isFieldStart(token)) {
        break;
      }
      await tokenStream.consume();
    }
  }

  private isFieldStart(token: Token): boolean {
    return token.type === 'IDENTIFIER' && ['TEXT', 'NUMBER', 'DATE', 'BOOLEAN', 'SCALE', 'LIST', 'TABLE', 'STOPWATCH', 'TIMER'].includes(token.value.toUpperCase());
  }
}

class InsertMissingTokenStrategy implements ErrorRecoveryStrategy {
  constructor(private expectedType: TokenType, private expectedValue?: string) {}

  async recover(error: ParserError, tokenStream: AsyncTokenStream): Promise<void> {
    console.log(`Inserting missing token: ${this.expectedType} ${this.expectedValue || ''}`);
    // Simulate insertion of the missing token
    // This doesn't actually modify the token stream, but allows parsing to continue
  }
}

export class ErrorRecoverySystem {
  private strategies: Map<string, ErrorRecoveryStrategy> = new Map();

  constructor() {
    this.registerDefaultStrategies();
  }

  private registerDefaultStrategies(): void {
    this.strategies.set('default', new SkipToNextFieldStrategy());
    this.strategies.set('missingBrace', new InsertMissingTokenStrategy('CHAR', '{'));
    // Add more default strategies as needed
  }

  registerStrategy(name: string, strategy: ErrorRecoveryStrategy): void {
    this.strategies.set(name, strategy);
  }

  async recoverFromError(error: ParserError, tokenStream: AsyncTokenStream): Promise<void> {
    const strategy = this.getStrategy(error);
    await strategy.recover(error, tokenStream);
  }

  private getStrategy(error: ParserError): ErrorRecoveryStrategy {
    // Determine the appropriate strategy based on the error
    if (error.message.includes("Expected '{'")) {
      return this.strategies.get('missingBrace') || this.strategies.get('default')!;
    }
    return this.strategies.get('default')!;
  }
}