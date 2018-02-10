import { ISyntax } from '../syntax';
import { getPatternDictionary, IPatternDictionary } from './patterns';

enum Token {
  IDENTIFIER,
  KEYWORD,
  SEPARATOR,
  OPERATOR,
  LITERAL,
  COMMENT
}

interface ILexicalToken {
  type: Token;
  value: any;
}

type Expression = ILexicalToken[];

export default function tokenize (string: string, syntax: ISyntax): Expression[] {
  const patternDictionary: IPatternDictionary = getPatternDictionary(syntax);
  const lines: string[] = string.split(/\r\n/);
  const expressions: Expression[] = [];

  console.log(lines);
  console.log(syntax);

  return expressions;
}
