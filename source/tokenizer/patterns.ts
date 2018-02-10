import { ISyntax, ITemplateKeywords } from '../syntax';

enum Pattern {
  METHOD,
  VALUE
}

interface IPatternDefinition {
  type: Pattern;
  regex: RegExp;
  template: string;
}

function getRegexFromTemplate (template: string): RegExp {
  return null;

  // TODO:
  // Return a valid RegExp instance/pattern from a template string
}

function createSyntaxKeywords (matches: string[], template: string): ITemplateKeywords {
  return null;

  // TODO:
  // Map the items in {matches} to their corresponding
  // properties in an ITemplateKeywords object, using the
  // order of the tokens specified in {template}; if
  // template is null just return the value
}

export interface IPatternDictionary {
  method: IPatternDefinition;
  value: IPatternDefinition;
}

export function getPatternDictionary (syntax: ISyntax): IPatternDictionary {
  const { method } = syntax;

  return {
    method: {
      type: Pattern.METHOD,
      regex: getRegexFromTemplate(method.open),
      template: method.open
    },
    value: {
      type: Pattern.VALUE,
      regex: new RegExp(/.+/),
      template: null
    }
  };
}

export function matchPattern (line: string, patternDictionary: IPatternDictionary): ITemplateKeywords {
  const patternDefinitions: IPatternDefinition[] = Object.keys(patternDictionary)
    .map((key: keyof IPatternDictionary) => patternDictionary[key]);

  for (const { regex, template } of patternDefinitions) {
    const matches: string[] = line.match(regex);

    if (matches) {
      return createSyntaxKeywords(matches, template);
    }
  }
}
