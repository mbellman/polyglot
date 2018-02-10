import { Directory, getFileContents } from './file';

interface IBlockSyntax {
  open: string;
  close: string;
}

export interface ITemplateKeywords {
  type?: string;
  name?: string;
  arguments?: string[];
}

export interface ISyntax {
  block: IBlockSyntax;
  method: IBlockSyntax;
  EOL: string;
}

export async function getSyntax (extension: string): Promise<ISyntax> {
  const syntax: string = await getFileContents(Directory.SYNTAX, `${extension}.json`);

  return JSON.parse(syntax);
}
