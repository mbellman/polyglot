import { Directory, getFileContents } from './file';

export interface IGrammar {
  typed: boolean;
  definitions: {
    block: {
      open: string;
      close: string;
    };
    EOL: string;
  };
}

export async function getGrammar (extension: string): Promise<IGrammar> {
  const grammar: string = await getFileContents(Directory.GRAMMAR, `${extension}.json`);

  return JSON.parse(grammar);
}
