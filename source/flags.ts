import assert from './assert';

function validateFlags (flags: IFlags): void {
  for (const flagName of [
    Flag.FILE_IN,
    Flag.LANGUAGE_OUT
  ]) {
    assert(
      !!flags[flagName as keyof IFlags],
      `Missing flag: -${flagName}`
    );
  }
}

export const enum Flag {
  FILE_IN = 'f',
  LANGUAGE_OUT = 'o'
}

export interface IFlags {
  [Flag.FILE_IN]?: string;
  [Flag.LANGUAGE_OUT]?: string;
}

export function getFlags (args: string[]): IFlags {
  const flags: IFlags = {};
  let i: number = 0;

  while (i < args.length) {
    const arg: string = args[i];
    const isFlagNameArg: boolean = arg.charAt(0) === '-';

    if (isFlagNameArg) {
      flags[arg.slice(1) as keyof IFlags] = args[i + 1];
    }

    i += isFlagNameArg ? 2 : 1;
  }

  validateFlags(flags);

  return flags;
}
