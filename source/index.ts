#!/usr/bin/env node

import assert from './assert';
import Logger from './Logger';
import tokenize from './tokenizer/tokenize';
import { Directory, getFileContents } from './file';
import { getFileExtension } from './helpers';
import { getFlags, IFlags, Flag } from './flags';
import { getSyntax, ISyntax } from './syntax';

async function main (args: string[]): Promise<void> {
  Logger.start();

  const flags: IFlags = getFlags(args);
  const fileName: string = flags[Flag.FILE_IN];
  const fileContents: string = await getFileContents(Directory.INPUT, fileName);

  assert(
    typeof fileContents === 'string',
    `${Directory.INPUT}/${fileName} is not a valid file.`
  );

  const extension: string = getFileExtension(fileName);
  const syntaxIn: ISyntax = await getSyntax(extension);
  const syntaxOut: ISyntax = await getSyntax(flags[Flag.LANGUAGE_OUT]);

  tokenize(fileContents, syntaxIn);

  Logger.finish();
}

main(process.argv);
