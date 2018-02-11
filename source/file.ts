import * as fs from 'fs';
import { Handler } from './types';

export enum Directory {
  INPUT = 'in',
  OUTPUT = 'out',
  GRAMMAR = 'grammar'
}

export function getFileContents (directory: Directory, file: string): Promise<string | null> {
  return new Promise((resolve: Handler<string>, reject: Handler<NodeJS.ErrnoException>) => {
    fs.readFile(`${directory}/${file}`, (err: NodeJS.ErrnoException, buffer: Buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString());
      }
    });
  }).catch((error: NodeJS.ErrnoException) => null);
}
