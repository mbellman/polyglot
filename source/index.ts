#!/usr/bin/env node

import assert from './assert';
import grammarize from './grammarizer/grammarize';
import Logger from './Logger';
import parse from './parser/parse';
import tokenize from './tokenizer/tokenize';
import { Directory, getFileContents } from './file';
import { Flag, getFlags, IFlags } from './flags';
import { getFileExtension } from './helpers';
import { IToken } from './tokenizer/types';
import { IGrammar } from 'grammarizer/types';

async function main (args: string[]): Promise<void> {
  Logger.start();

  const flags: IFlags = getFlags(args);
  const inputFilename: string = flags[Flag.FILE_IN];
  const inputFileContents: string = await getFileContents(Directory.INPUT, inputFilename);

  assert(!!inputFileContents, `${Directory.INPUT}/${inputFilename} is not a valid file.`);

  const inputFileExtension: string = getFileExtension(inputFilename);
  const inputGrammar: IGrammar = await grammarize(inputFileExtension);
  const ouputGrammar: IGrammar = await grammarize(flags[Flag.LANGUAGE_OUT]);

  assert(
    ouputGrammar.typed ? inputGrammar.typed : true,
    'You cannot transpile a non-typed language to a typed language.'
  );

  const tokens: IToken[] = tokenize(inputFileContents);

  console.log(tokens);

  Logger.finish();
}

main(process.argv);
