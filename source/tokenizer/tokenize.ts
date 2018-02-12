import assert from '../assert';
import { createTokenizer } from './createTokenizer';
import { IGrammar } from '../grammar';
import { IToken, Tokenizer, TokenType } from './types';

const tokenizers: Tokenizer[] = [
  createTokenizer(TokenType.WORD, /\w/),
  createTokenizer(TokenType.NUMBER, /\d/),
  createTokenizer(TokenType.OPEN_BRACKET, /\[/),
  createTokenizer(TokenType.OPEN_CURLY_BRACE, /\{/),
  createTokenizer(TokenType.OPEN_PARENTHESIS, /\(/),
  createTokenizer(TokenType.CLOSE_BRACKET, /\]/),
  createTokenizer(TokenType.CLOSE_CURLY_BRACE, /\}/),
  createTokenizer(TokenType.CLOSE_PARENTHESIS, /\)/),
  createTokenizer(TokenType.OPERATOR, /[-*+\/%&!^~]/),
  createTokenizer(TokenType.QUOTE, /["']/),
  createTokenizer(TokenType.SYMBOLS, /[$_|=`:;<>?,.]/),
  createTokenizer(TokenType.WHITESPACE, /(\s|\t|\r|\n)/),
];

export default function tokenize (input: string): IToken[] {
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
