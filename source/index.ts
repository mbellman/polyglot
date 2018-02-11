#!/usr/bin/env node

import assert from './assert';
import Logger from './Logger';
import tokenize from './tokenizer/tokenize';
import { Directory, getFileContents } from './file';
import { getFileExtension } from './helpers';
import { getFlags, IFlags, Flag } from './flags';
import { getGrammar, IGrammar } from './grammar';

async function main (args: string[]): Promise<void> {
  Logger.start();

  const flags: IFlags = getFlags(args);
  const inputFilename: string = flags[Flag.FILE_IN];
  const inputFileContents: string = await getFileContents(Directory.INPUT, inputFilename);

  assert(
    typeof inputFileContents === 'string',
    `${Directory.INPUT}/${inputFilename} is not a valid file.`
  );

  const extension: string = getFileExtension(inputFilename);
  const grammarIn: IGrammar = await getGrammar(extension);
  const grammarOut: IGrammar = await getGrammar(flags[Flag.LANGUAGE_OUT]);

  assert(
    grammarOut.typed ? grammarIn.typed : true,
    'You cannot transpile a non-typed language to a typed language.'
  );

  // parse(inputFileContents, grammarIn);

  Logger.finish();
}

main(process.argv);
