import _ from 'lodash';

export interface BasePropType {
  jsDoc: string | undefined;
  type: string;
}

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

export interface AnyType extends BasePropType {
  type: 'any';
}

export function createAnyType(init: { jsDoc: string | undefined }): AnyType {
  return {
    type: 'any',
    jsDoc: init.jsDoc,
  };
}

export interface ArrayType extends BasePropType {
  arrayType: PropType;
  type: 'array';
}

export function createArrayType(init: {
  arrayType: PropType;
  jsDoc: string | undefined;
}): ArrayType {
  return {
    type: 'array',
    jsDoc: init.jsDoc,
    arrayType: init.arrayType,
  };
}

export interface BooleanType extends BasePropType {
  type: 'boolean';
}

export function createBooleanType(init: { jsDoc: string | undefined }): BooleanType {
  return {
    type: 'boolean',
    jsDoc: init.jsDoc,
  };
}

export interface DOMElementType extends BasePropType {
  optional?: boolean;
  type: 'DOMElementNode';
}

export function createDOMElementType(init: {
  optional: boolean | undefined;
  jsDoc: string | undefined;
}): DOMElementType {
  return {
    type: 'DOMElementNode',
    jsDoc: init.jsDoc,
    optional: init.optional,
  };
}

export interface ElementType extends BasePropType {
  elementType: 'element' | 'node' | 'elementType';
  type: 'ElementNode';
}

export function createElementType(init: {
  elementType: ElementType['elementType'];
  jsDoc: string | undefined;
}): ElementType {
  return {
    type: 'ElementNode',
    jsDoc: init.jsDoc,
    elementType: init.elementType,
  };
}

export interface FunctionType extends BasePropType {
  type: 'FunctionNode';
}

export function createFunctionType(init: { jsDoc: string | undefined }): FunctionType {
  return {
    type: 'FunctionNode',
    jsDoc: init.jsDoc,
  };
}

export interface InstanceOfType extends BasePropType {
  instance: string;
  type: 'InstanceOfNode';
}

export function createInstanceOfType(init: {
  jsDoc: string | undefined;
  instance: string;
}): InstanceOfType {
  return {
    type: 'InstanceOfNode',
    instance: init.instance,
    jsDoc: init.jsDoc,
  };
}

export interface InterfaceType extends BasePropType {
  type: 'InterfaceNode';
  types: ReadonlyArray<[string, PropType]>;
}

export function createInterfaceType(init: {
  jsDoc: string | undefined;
  types: ReadonlyArray<[string, PropType]> | undefined;
}): InterfaceType {
  return {
    type: 'InterfaceNode',
    jsDoc: init.jsDoc,
    types: init.types ?? [],
  };
}

export interface LiteralType extends BasePropType {
  value: unknown;
  type: 'LiteralNode';
}

export function createLiteralType(init: {
  value: unknown;
  jsDoc: string | undefined;
}): LiteralType {
  return {
    type: 'LiteralNode',
    value: init.value,
    jsDoc: init.jsDoc,
  };
}

export interface NumericType extends BasePropType {
  type: 'NumericNode';
}

export function createNumericType(init: { jsDoc: string | undefined }): NumericType {
  return {
    type: 'NumericNode',
    jsDoc: init.jsDoc,
  };
}

export interface ObjectType extends BasePropType {
  type: 'ObjectNode';
}

export function createObjectType(init: { jsDoc: string | undefined }): ObjectType {
  return {
    type: 'ObjectNode',
    jsDoc: init.jsDoc,
  };
}

export interface StringType extends BasePropType {
  type: 'StringNode';
}

export function createStringType(init: { jsDoc: string | undefined }): StringType {
  return {
    type: 'StringNode',
    jsDoc: init.jsDoc,
  };
}

export interface UndefinedType extends BasePropType {
  type: 'UndefinedNode';
}

export function createUndefinedType(init: { jsDoc: string | undefined }): UndefinedType {
  return {
    type: 'UndefinedNode',
    jsDoc: init.jsDoc,
  };
}

export interface UnionType extends BasePropType {
  type: 'UnionNode';
  types: readonly PropType[];
}

export function uniqueUnionTypes(node: UnionType): UnionType {
  return {
    type: node.type,
    jsDoc: node.jsDoc,
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

export function createUnionType(init: {
  jsDoc: string | undefined;
  types: readonly PropType[];
}): UnionType {
  const flatTypes: PropType[] = [];

  function flattenTypes(nodes: readonly PropType[]) {
    nodes.forEach((type) => {
      if (type.type === 'UnionNode') {
        flattenTypes(type.types);
      } else {
        flatTypes.push(type);
      }
    });
  }

  flattenTypes(init.types);

  return uniqueUnionTypes({
    type: 'UnionNode',
    jsDoc: init.jsDoc,
    types: flatTypes,
  });
}
