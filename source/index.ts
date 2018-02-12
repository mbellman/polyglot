#!/usr/bin/env node

import assert from './assert';
import Logger from './Logger';
import tokenize from './tokenizer/tokenize';
import { Directory, getFileContents } from './file';
import { Flag, getFlags, IFlags } from './flags';
import { getFileExtension } from './helpers';
import { getGrammar, IGrammar } from './grammar';
import { IToken } from './tokenizer/types';

async function main (args: string[]): Promise<void> {
  Logger.start();

  const flags: IFlags = getFlags(args);
  const inputFilename: string = flags[Flag.FILE_IN];
  const inputFileContents: string = await getFileContents(Directory.INPUT, inputFilename);

  assert(
    typeof inputFileContents === 'string',
    `${Directory.INPUT}/${inputFilename} is not a valid file.`
  );

  const inputFileExtension: string = getFileExtension(inputFilename);
  const inputGrammar: IGrammar = await getGrammar(inputFileExtension);
  const ouputGrammar: IGrammar = await getGrammar(flags[Flag.LANGUAGE_OUT]);

  assert(
    ouputGrammar.typed ? inputGrammar.typed : true,
    'You cannot transpile a non-typed language to a typed language.'
  );

  const tokens: IToken[] = tokenize(inputFileContents);

  console.log(tokens);

  Logger.finish();
}

main(process.argv);
