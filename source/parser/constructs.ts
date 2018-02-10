import { IValue } from './statements';

export interface IVariableDefinition {
  type?: string;
  name: string;
  value?: IValue;
}

export interface IMethodDefinition {
  type?: string;
  name: string;
  arguments: IVariableDefinition[];
  returnType?: string;
}
