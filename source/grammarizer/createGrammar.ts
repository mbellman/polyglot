import { IGrammar, IGrammarTemplate } from './types';

export default function createGrammar (grammarTemplate: IGrammarTemplate): IGrammar {
  // TODO: Convert {grammarTemplate} into an optimized IGrammar
  // object to be used by the parser for outgoing transpilation or
  // the compiler for incoming (target) transpilation
  return grammarTemplate as IGrammar;
}
