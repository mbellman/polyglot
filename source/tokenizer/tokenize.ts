import assert from '../assert';
import { createTokenizer, Tokenizer } from './createTokenizer';
import { IGrammar } from '../grammar';

export enum TokenType {
  WORD,
  NUMBER,
  OPEN_BRACKET,
  CLOSE_BRACKET,
  OPEN_CURLY_BRACE,
  CLOSE_CURLY_BRACE,
  OPEN_PARENTHESIS,
  CLOSE_PARENTHESIS,
  SEMICOLON,
  QUOTE,
  SYMBOLS,
  WHITESPACE
}

const tokenizers: Tokenizer[] = [
  createTokenizer(TokenType.WORD, /\w/),
  createTokenizer(TokenType.NUMBER, /\d/),
  createTokenizer(TokenType.OPEN_BRACKET, /\[/),
  createTokenizer(TokenType.CLOSE_BRACKET, /\]/),
  createTokenizer(TokenType.OPEN_CURLY_BRACE, /\{/),
  createTokenizer(TokenType.CLOSE_CURLY_BRACE, /\}/),
  createTokenizer(TokenType.OPEN_PARENTHESIS, /\(/),
  createTokenizer(TokenType.CLOSE_PARENTHESIS, /\)/),
  createTokenizer(TokenType.QUOTE, /("|')/),
  createTokenizer(TokenType.SYMBOLS, /(\.|,|:|;|\\|\/|>|<|!|@|#|\$|%|\^|&|\*|-|\+|=|~|`)/),
  createTokenizer(TokenType.WHITESPACE, /(\s|\t|\r|\n)/),
];

export interface IToken {
  type: TokenType;
  value: string;
}

export function tokenize (input: string, grammar: IGrammar): IToken[] {
  const tokens: IToken[] = [];
  let offset: number = 0;

  while (offset < input.length) {
    let totalFailedTokenizers: number = 0;

    for (const tokenizer of tokenizers) {
      const token: IToken = tokenizer(input, offset);
      const { type, value } = token;

      if (value) {
        if (type !== TokenType.WHITESPACE) {
          tokens.push(token);
        }

        offset += value.length;

        break;
      }

      totalFailedTokenizers++;
    }

    assert(
      totalFailedTokenizers < tokenizers.length,
      `Unexpected character: '${input[offset]}'`
    );
  }

  return tokens;
}
