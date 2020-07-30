import _ from 'lodash';

export type PropType =
  | AnyType
  | ArrayType
  | BooleanType
  | DOMElementType
  | ElementType
  | FunctionType
  | InstanceOfType
  | InterfaceType
  | LiteralType
  | NumericType
  | ObjectType
  | StringType
  | UndefinedType
  | UnionType;

export interface AnyType {
  type: 'any';
}

export function createAnyType(): AnyType {
  return {
    type: 'any',
  };
}

export interface ArrayType {
  arrayType: PropType;
  type: 'array';
}

export function createArrayType(arrayType: PropType): ArrayType {
  return {
    type: 'array',
    arrayType,
  };
}

export interface BooleanType {
  type: 'boolean';
}

export function createBooleanType(): BooleanType {
  return {
    type: 'boolean',
  };
}

export interface DOMElementType {
  optional?: boolean;
  type: 'DOMElementNode';
}

export function createDOMElementType(optional?: boolean): DOMElementType {
  return {
    type: 'DOMElementNode',
    optional,
  };
}

export interface ElementType {
  elementType: 'element' | 'node' | 'elementType';
  type: 'ElementNode';
}

export function createElementType(elementType: ElementType['elementType']): ElementType {
  return {
    type: 'ElementNode',
    elementType,
  };
}

export interface FunctionType {
  type: 'FunctionNode';
}

export function createFunctionType(): FunctionType {
  return {
    type: 'FunctionNode',
  };
}

export interface InstanceOfType {
  instance: string;
  type: 'InstanceOfNode';
}

export function createInstanceOfType(instance: string): InstanceOfType {
  return {
    type: 'InstanceOfNode',
    instance,
  };
}

export interface InterfaceType {
  type: 'InterfaceNode';
  types: Array<[string, PropType]>;
}

export function createInterfaceType(types: Array<[string, PropType]> = []): InterfaceType {
  return {
    type: 'InterfaceNode',
    types,
  };
}

export interface LiteralType {
  value: unknown;
  jsDoc?: string;
  type: 'LiteralNode';
}

export function createLiteralType(value: unknown, jsDoc?: string): LiteralType {
  return {
    type: 'LiteralNode',
    value,
    jsDoc,
  };
}

export interface NumericType {
  type: 'NumericNode';
}

export function createNumericType(): NumericType {
  return {
    type: 'NumericNode',
  };
}

export interface ObjectType {
  type: 'ObjectNode';
}

export function createObjectType(): ObjectType {
  return {
    type: 'ObjectNode',
  };
}

export interface StringType {
  type: 'StringNode';
}

export function createStringType(): StringType {
  return {
    type: 'StringNode',
  };
}

export interface UndefinedType {
  type: 'UndefinedNode';
}

export function createUndefinedType(): UndefinedType {
  return {
    type: 'UndefinedNode',
  };
}

export interface UnionType {
  type: 'UnionNode';
  types: PropType[];
}

export function uniqueUnionTypes(node: UnionType): UnionType {
  return {
    type: node.type,
    types: _.uniqBy(node.types, (type) => {
      if (type.type === 'LiteralNode') {
        return type.value;
      }

      if (type.type === 'InstanceOfNode') {
        return `${type.type}.${type.instance}`;
      }

      return type.type;
    }),
  };
}

export function createUnionType(types: PropType[]): UnionType {
  const flatTypes: PropType[] = [];

  function flattenTypes(nodes: PropType[]) {
    nodes.forEach((type) => {
      if (type.type === 'UnionNode') {
        flattenTypes(type.types);
      } else {
        flatTypes.push(type);
      }
    });
  }

  flattenTypes(types);

  return uniqueUnionTypes({
    type: 'UnionNode',
    types: flatTypes,
  });
}
