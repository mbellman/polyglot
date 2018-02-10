export namespace Operators {
  export enum Math {
    ADD,
    SUBTRACT,
    MULTIPLY,
    DIVIDE,
    MODULO
  }

  export enum Conditional {
    EQUAL_TO,
    STRICT_EQUAL_TO,
    NOT_EQUAL_TO,
    STRICT_NOT_EQUAL_TO,
    GREATER_THAN,
    GREATER_THAN_OR_EQUAL_TO,
    LESS_THAN,
    LESS_THAN_OR_EQUAL_TO,
    CONDITIONAL_AND,
    CONDITIONAL_OR,
    BITWISE_AND,
    BITWISE_OR
  }

  export enum Transformation {
    ASSIGN,
    ADD_ASSIGN,
    SUBTRACT_ASSIGN,
    MULTIPLY_ASSIGN,
    DIVIDE_ASSIGN,
    BITWISE_LEFT,
    BITWISE_RIGHT,
    BITWISE_AND_ASSIGN,
    BITWISE_OR_ASSIGN
  }
}

export interface IPrimitive {
  value: string | number | true | false;
}

export interface IReference {
  name: string;
}

export interface IValue {
  value: IPrimitive | IReference | ICondition;
}

export interface ICondition {
  leftOperand: IValue | IMethodCall;
  operator: Operators.Conditional;
  rightOperand: IValue | IMethodCall;
}

export interface IMethodCall {
  methodName: string;
  arguments: (IValue | IMethodCall)[];
}
