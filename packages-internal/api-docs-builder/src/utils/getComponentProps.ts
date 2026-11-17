import { getOwnPropsFilenames } from '@mui/internal-docs-utils';
import {
  defaultSortLiteralUnions,
  getPropTypesFromFile,
} from '@mui/internal-scripts/typescript-to-proptypes';
import type {
  GetPropTypesFromFileOptions,
  LiteralType,
  PropType,
  PropTypesComponent,
  UnionType,
} from '@mui/internal-scripts/typescript-to-proptypes';
import type { TypeScriptProject } from './createTypeScriptProject';

/**
 * The type of a prop, using the vocabulary of the API docs (`bool`, `func`, `union`, …).
 */
export type DocsPropType =
  | { name: 'union'; value: DocsPropType[] }
  | { name: 'enum'; value: string[] }
  | { name: 'shape'; value: Record<string, DocsPropType & { required: boolean }> }
  | { name: 'arrayOf'; value: DocsPropType }
  | { name: 'instanceOf'; value: string }
  | { name: 'custom'; description: string }
  | {
      name:
        | 'any'
        | 'array'
        | 'bool'
        | 'element'
        | 'elementType'
        | 'func'
        | 'node'
        | 'number'
        | 'object'
        | 'string';
    };

export interface ComponentPropDescriptor {
  /**
   * The raw JSDoc of the prop.
   */
  description: string;
  required: boolean;
  type: DocsPropType;
  defaultValue?: { value: string };
  /**
   * If `true`, the prop is only declared in dependencies, like React's DOM attributes.
   */
  external?: boolean;
}

export interface ShouldIncludePropData {
  componentName: string;
  prop: { name: string; filenames: Set<string> };
}

export interface PropsParsingSettings extends Pick<
  GetPropTypesFromFileOptions,
  'shouldResolveObject' | 'shouldUseObjectForDate'
> {
  /**
   * Decides whether a prop is documented.
   * Return `undefined` to use the default behavior:
   * document `children`, props declared next to the component, and props used by the implementation.
   */
  shouldIncludeProp?: (data: ShouldIncludePropData) => boolean | undefined;
  /**
   * Custom order of the literals of a union.
   */
  getSortLiteralUnions?: (data: {
    componentName: string;
    propName: string;
  }) => ((a: LiteralType, b: LiteralType) => number) | undefined;
}

function formatLiteral(value: unknown): string {
  if (typeof value === 'string' && value.startsWith('"')) {
    const text = JSON.parse(value) as string;
    return text.includes("'") && !text.includes('"') ? value : `'${text}'`;
  }
  return String(value);
}

function isNullish(type: PropType) {
  return type.type === 'UndefinedNode' || (type.type === 'LiteralNode' && type.value === 'null');
}

function getUnionSortName(type: PropType): string {
  if (type.type === 'InstanceOfNode') {
    return `${type.type}.${type.instance}`;
  }
  if (type.type === 'InterfaceNode') {
    return 'ShapeNode';
  }
  return type.type;
}

interface ConvertContext {
  propName: string;
  sortLiterals: (a: LiteralType, b: LiteralType) => number;
}

/**
 * Whether the converted type accepts `undefined`/`null`.
 */
function isOptional(propType: PropType): boolean {
  if (propType.type === 'DOMElementNode') {
    return true;
  }
  if (propType.type === 'UnionNode') {
    return propType.types.some(isNullish);
  }
  return false;
}

function isOptionalShapeField(name: string, propType: PropType): boolean {
  return isOptional(propType) || (propType.type === 'ElementNode' && name !== 'children');
}

function convertType(propType: PropType, context: ConvertContext): DocsPropType {
  switch (propType.type) {
    case 'InterfaceNode':
      // Built-in types with symbol keys, e.g. iterables or `BigInt`,
      // and library types with internal keys, e.g. Emotion's `__emotion_styles`.
      if (propType.types.some(([name]) => name.startsWith('__'))) {
        return { name: 'object' };
      }
      return {
        name: 'shape',
        value: Object.fromEntries(
          propType.types
            .slice()
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([name, type]) => [
              name,
              { ...convertType(type, context), required: !isOptionalShapeField(name, type) },
            ]),
        ),
      };
    case 'FunctionNode':
      return { name: 'func' };
    case 'StringNode':
      return { name: 'string' };
    case 'boolean':
      return { name: 'bool' };
    case 'NumericNode':
      return { name: 'number' };
    case 'LiteralNode':
      return { name: 'enum', value: [formatLiteral(propType.value)] };
    case 'ObjectNode':
      return { name: 'object' };
    case 'any':
      // `key` is documented with a custom validator.
      return context.propName === 'key' ? { name: 'custom', description: 'any' } : { name: 'any' };
    case 'ElementNode':
      return { name: propType.elementType };
    case 'InstanceOfNode':
      return { name: 'instanceOf', value: propType.instance };
    case 'DOMElementNode':
      return { name: 'custom', description: 'HTML element' };
    case 'array':
      if (propType.arrayType.type === 'any') {
        return { name: 'array' };
      }
      return { name: 'arrayOf', value: convertType(propType.arrayType, context) };
    case 'UnionNode':
      return convertUnion(propType, context);
    default:
      return { name: 'any' };
  }
}

function convertUnion(propType: UnionType, context: ConvertContext): DocsPropType {
  const { types } = propType;
  if (types.length === 2 && types.some((type) => type.type === 'DOMElementNode')) {
    return { name: 'custom', description: 'HTML element' };
  }

  const nonNullish = types.filter((type) => !isNullish(type));
  let literals = nonNullish
    .filter((type): type is LiteralType => type.type === 'LiteralNode')
    .sort(context.sortLiterals);
  const seen = new Set<string>();
  const rest: DocsPropType[] = nonNullish
    .filter((type) => type.type !== 'LiteralNode')
    .sort((a, b) => getUnionSortName(a).localeCompare(getUnionSortName(b)))
    .map((type) => convertType(type, context))
    .filter((type) => {
      const hash = JSON.stringify(type);
      if (seen.has(hash)) {
        return false;
      }
      seen.add(hash);
      return true;
    });

  if (literals.some((x) => x.value === 'true') && literals.some((x) => x.value === 'false')) {
    rest.push({ name: 'bool' });
    literals = literals.filter((x) => x.value !== 'true' && x.value !== 'false');
  }

  const enumType: DocsPropType | null =
    literals.length > 0
      ? { name: 'enum', value: literals.map((literal) => formatLiteral(literal.value)) }
      : null;

  if (rest.length === 0) {
    if (enumType) {
      return enumType;
    }
    // Only `null` or `undefined`, e.g. an unsupported `children` prop.
    return types.some((type) => type.type === 'LiteralNode' && type.value === 'null')
      ? { name: 'custom', description: 'null' }
      : { name: 'any' };
  }
  if (enumType === null && rest.length === 1) {
    return rest[0];
  }
  return { name: 'union', value: enumType ? [enumType, ...rest] : rest };
}

function findComponent(components: PropTypesComponent[], componentName: string) {
  return (
    components.find((component) => component.name === componentName) ??
    (components.length === 1 ? components[0] : undefined)
  );
}

function splitTopLevelUnion(typeText: string): string[] {
  const members: string[] = [];
  let depth = 0;
  let current = '';
  for (const char of typeText) {
    if ('<({['.includes(char)) {
      depth += 1;
    } else if ('>)}]'.includes(char)) {
      depth -= 1;
    }
    if (char === '|' && depth === 0) {
      members.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  members.push(current.trim());
  return members.filter((member) => member !== '' && member !== 'undefined' && member !== 'null');
}

const REACT_NODE_MEMBERS = new Set<DocsPropType['name']>([
  'element',
  'number',
  'string',
  'bool',
  'object',
  'shape',
  'enum',
  'node',
  'array',
  'arrayOf',
]);

/**
 * Whether the type is a ref whose `current` value is an object of methods.
 */
function isMethodsRef(type: DocsPropType): boolean {
  const members = type.name === 'union' ? type.value : [type];
  return members.some((member) => {
    if (member.name !== 'shape' || !member.value.current) {
      return false;
    }
    const current = member.value.current;
    return (
      current.name === 'shape' &&
      Object.values(current.value).length > 0 &&
      Object.values(current.value).every((method) => method.name === 'func')
    );
  });
}

/**
 * Adjusts the converted type for type annotations the structural type can't express.
 */
function applyTypeAnnotation(type: DocsPropType, typeText: string | undefined): DocsPropType {
  if (typeText === undefined) {
    return type;
  }
  const members = splitTopLevelUnion(typeText);

  // `React.ReactNode` expands to a large union of primitives and iterables.
  if (members.some((member) => /^(NonNullable<)?(React\.)?ReactNode>?$/.test(member))) {
    const rest =
      type.name === 'union'
        ? type.value.filter((member) => !REACT_NODE_MEMBERS.has(member.name))
        : [];
    return rest.length > 0
      ? { name: 'union', value: [{ name: 'node' }, ...rest] }
      : { name: 'node' };
  }

  // Refs to DOM nodes or other opaque values are documented as `ref`,
  // refs to an object of methods, like `action`, keep that object's shape.
  if (members.length === 1 && /^(React\.)?Ref<.*>$/s.test(members[0])) {
    return isMethodsRef(type) ? type : { name: 'custom', description: 'ref' };
  }

  // The union can be extended through module augmentation.
  if (members.length === 1 && members[0].startsWith('OverridableStringUnion<')) {
    if (type.name === 'enum') {
      return { name: 'union', value: [type, { name: 'string' }] };
    }
    if (type.name === 'union' && !type.value.some((member) => member.name === 'string')) {
      return { name: 'union', value: [...type.value, { name: 'string' }] };
    }
  }

  return type;
}

function isDeclaredOnlyInDependencies(project: TypeScriptProject, filenames: Set<string>) {
  return (
    filenames.size > 0 &&
    Array.from(filenames).every((filename) => {
      const sourceFile = project.program.getSourceFile(filename);
      return (
        sourceFile !== undefined &&
        (project.program.isSourceFileFromExternalLibrary(sourceFile) ||
          project.program.isSourceFileDefaultLibrary(sourceFile))
      );
    })
  );
}

/**
 * Returns the props of a component, read from its TypeScript definitions.
 */
export function getComponentProps({
  project,
  componentName,
  filename,
  usedProps,
  defaultValues,
  settings = {},
}: {
  project: TypeScriptProject;
  componentName: string;
  /**
   * The file implementing the component.
   */
  filename: string;
  usedProps: readonly string[];
  defaultValues: Record<string, string>;
  settings?: PropsParsingSettings;
}): Record<string, ComponentPropDescriptor> {
  const typesFilename = filename.replace(/\.js$/, '.d.ts');
  if (!project.program.getSourceFile(typesFilename)) {
    return {};
  }

  const component = findComponent(
    getPropTypesFromFile({
      filePath: typesFilename,
      project,
      checkDeclarations: true,
      shouldResolveObject: settings.shouldResolveObject,
      shouldUseObjectForDate: settings.shouldUseObjectForDate,
    }),
    componentName,
  );
  if (!component) {
    return {};
  }

  const ownPropsFilenames = getOwnPropsFilenames(typesFilename);
  const props: Record<string, ComponentPropDescriptor> = {};
  component.types
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((prop) => {
      const include =
        settings.shouldIncludeProp?.({
          componentName: component.name,
          prop: { name: prop.name, filenames: prop.filenames },
        }) ??
        (prop.name === 'children' ||
          Array.from(prop.filenames).some((propFilename) => ownPropsFilenames.has(propFilename)) ||
          usedProps.includes(prop.name));
      if (!include) {
        return;
      }

      const sortLiterals =
        settings.getSortLiteralUnions?.({ componentName: component.name, propName: prop.name }) ??
        defaultSortLiteralUnions;

      props[prop.name] = {
        description: prop.jsDoc ?? '',
        required: !isOptional(prop.propType),
        type: applyTypeAnnotation(
          convertType(prop.propType, { propName: prop.name, sortLiterals }),
          prop.typeText,
        ),
        defaultValue:
          defaultValues[prop.name] !== undefined ? { value: defaultValues[prop.name] } : undefined,
        external: isDeclaredOnlyInDependencies(project, prop.filenames),
      };
    });

  return props;
}
