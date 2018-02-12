import assert from '../assert';
import createGrammar from './createGrammar';
import { Directory, getFileContents } from '../file';
import { IGrammar, IGrammarTemplate } from './types';

export default async function grammarize (language: string): Promise<IGrammar> {
  const grammarTemplateContents: string = await getFileContents(Directory.GRAMMAR, `${language}.json`);

  assert (!!grammarTemplateContents, `Invalid language grammar file: '${language}.json'`);

  const grammarTemplate: IGrammarTemplate = JSON.parse(grammarTemplateContents);
  const grammar: IGrammar = createGrammar(grammarTemplate);

  return grammar;
}
