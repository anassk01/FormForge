import { LexerService, Token, TokenType } from './lexer.service';

export class AsyncTokenStream {
    constructor(private lexer: LexerService) {}
  
    getInput(): string {
        return this.lexer.getInput();
      }

    private currentToken: Token | null = null;


  async initialize(): Promise<void> {
    await this.advance();
  }

  async peek(): Promise<Token | null> {
    return this.currentToken;
  }

  async consume(): Promise<Token> {
    const token = this.currentToken;
    await this.advance();
    return token!;
  }

  async match(type: TokenType, value?: string): Promise<boolean> {
    const token = await this.peek();
    console.log(`Matching token: ${JSON.stringify(token)} against type: ${type}, value: ${value}`);
    if (!token) return false;
    if (token.type !== type) return false;
    if (value && token.value.toUpperCase() !== value.toUpperCase()) return false;
    await this.consume();
    return true;
  }

  private async advance(): Promise<void> {
    this.currentToken = await this.lexer.nextToken();
  }
}