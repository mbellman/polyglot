export enum TokenType {
  WORD,
  NUMBER,
  OPEN_BRACKET,
  OPEN_CURLY_BRACE,
  OPEN_PARENTHESIS,
  CLOSE_BRACKET,
  CLOSE_CURLY_BRACE,
  CLOSE_PARENTHESIS,
  OPERATOR,
  QUOTE,
  SYMBOLS,
  WHITESPACE
}

export interface IToken {
  type: TokenType;
  value: string;
}

export type Tokenizer = (input: string, offset: number) => IToken;
