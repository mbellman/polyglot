import { IToken, TokenType } from './tokenize';

export type Tokenizer = (input: string, offset: number) => IToken;

export function createTokenizer (tokenType: TokenType, pattern: RegExp): Tokenizer {
  return (input: string, offset: number): IToken => {
    let incomingChar: string = input[offset];
    let value: string = '';

    if (pattern.test(incomingChar)) {
      while (pattern.test(incomingChar)) {
        value += incomingChar;
        incomingChar = input[++offset];
      }
    } else {
      value = null;
    }

    return {
      type: tokenType,
      value
    };
  };
}
