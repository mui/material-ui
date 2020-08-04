declare module 'react-docgen' {
  export type Handler = () => unknown;

  export const defaultHandlers: Handler[];

  export interface ReactDocgenApi {
    description: string;
    props: Record<string, PropDescriptor>;
  }

  export interface BasePropTypeDescriptor {
    computed?: boolean;
    description?: string;
    raw: string;
    required?: boolean;
    type?: PropType;
  }

  interface ArrayOfPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'arrayOf';
    value: PropTypeDescriptor;
  }
  interface CustomPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'custom';
  }
  interface EnumPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'enum';
    value: StringPropTypeDescriptor[];
  }
  interface ArrayPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'array';
  }
  interface BoolPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'bool';
  }
  interface FuncPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'func';
  }
  interface NumberPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'number';
  }
  interface ObjectPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'object';
  }
  interface StringPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'string';
    value: string;
  }
  interface AnyPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'any';
  }
  interface ElementPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'element';
  }
  interface NodePropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'node';
  }
  interface SymbolPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'symbol';
  }
  interface ObjectOfPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'objectOf';
  }
  interface ShapePropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'shape';
    value: Record<string, PropTypeDescriptor>;
  }
  interface ExactPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'exact';
  }
  interface UnionPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'union';
    value: PropTypeDescriptor[];
  }
  interface ElementTypePropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'elementType';
  }
  // not listed in react-docgen
  interface InstanceOfPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'instanceOf';
    value: string;
  }

  export type PropTypeDescriptor =
    | ShapePropTypeDescriptor
    | ArrayOfPropTypeDescriptor
    | CustomPropTypeDescriptor
    | EnumPropTypeDescriptor
    | ArrayPropTypeDescriptor
    | BoolPropTypeDescriptor
    | FuncPropTypeDescriptor
    | NumberPropTypeDescriptor
    | ObjectPropTypeDescriptor
    | StringPropTypeDescriptor
    | AnyPropTypeDescriptor
    | ElementPropTypeDescriptor
    | NodePropTypeDescriptor
    | SymbolPropTypeDescriptor
    | ObjectOfPropTypeDescriptor
    | ExactPropTypeDescriptor
    | UnionPropTypeDescriptor
    | ElementTypePropTypeDescriptor
    | InstanceOfPropTypeDescriptor;

  export interface PropDescriptor {
    defaultValue?: unknown;
    description?: string;
    required?: boolean;
    /**
     * react-docgen has this as nullable but it was never treated as such
     */
    type: PropTypeDescriptor;
  }

  export interface AllLiteralPropType {
    type: 'AllLiteral';
  }

  export interface TypeApplicationPropType {
    applications: string[];
    type: 'TypeApplication';
  }

  export interface StringLiteralTypePropType {
    type: 'StringLiteralType';
  }

  export interface UnionPropType {
    type: 'UnionType';
    elements: PropType[];
  }

  export type PropType =
    | AllLiteralPropType
    | StringLiteralType
    | TypeApplicationPropType
    | UnionPropType;

  export function parse(
    source: string,
    unknown: null,
    handlers: Handler[0],
    options: { filename: string }
  ): any;
}
