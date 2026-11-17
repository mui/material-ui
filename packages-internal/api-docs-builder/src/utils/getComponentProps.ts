import * as doctrine from 'doctrine';
import { getUnstyledFilename } from '@mui/internal-docs-utils';
import { getPropTypesFromFile } from '@mui/internal-scripts/typescript-to-proptypes';
import type {
  PropType,
  PropTypeDefinition,
  PropTypesComponent,
  LiteralType,
  UnionType,
} from '@mui/internal-scripts/typescript-to-proptypes';
import { TypeScriptProject } from './createTypeScriptProject';

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
  | { name: string };

export interface ComponentPropDescriptor {
  /**
   * The raw JSDoc of the prop.
   */
  description: string;
  required: boolean;
  type: DocsPropType;
  defaultValue?: { value: string };
  jsdocDefaultValue?: { value: string };
}

export interface ShouldIncludePropData {
  componentName: string;
  prop: { name: string; filenames: Set<string>; jsDoc: string | undefined };
  /**
   * The file holding the component's type definitions.
   */
  typesFilename: string;
  /**
   * Props read by the component's implementation.
   */
  usedProps: readonly string[];
}

export interface PropsParsingSettings {
  /**
   * Decides whether a prop is documented.
   * Return `undefined` to use the default behavior:
   * document `children`, props declared next to the component, and props used by the implementation.
   */
  shouldIncludeProp?: (data: ShouldIncludePropData) => boolean | undefined;
  /**
   * Decides whether the shape of an object type is documented.
   * Return `undefined` to use the default behavior.
   */
  shouldResolveObject?: (data: {
    name: string;
    propertyCount: number;
    depth: number;
  }) => boolean | undefined;
  /**
   * Whether `Date` props are documented as `object` instead of `Date`.
   */
  shouldUseObjectForDate?: (data: { name: string }) => boolean;
  /**
   * Custom order of the literals of a union.
   */
  getSortLiteralUnions?: (data: {
    componentName: string;
    propName: string;
  }) => ((a: LiteralType, b: LiteralType) => number) | undefined;
}

function defaultSortLiteralUnions(a: LiteralType, b: LiteralType) {
  const { value: valueA } = a;
  const { value: valueB } = b;
  if (typeof valueA === 'number' && typeof valueB === 'number') {
    return valueA - valueB;
  }
  if (typeof valueA === 'number') {
    return 1;
  }
  if (typeof valueB === 'number') {
    return -1;
  }
  return String(valueA).localeCompare(String(valueB));
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
  if (propType.type === 'UnionNode') {
    return isOptional(propType);
  }
  if (propType.type === 'DOMElementNode') {
    return true;
  }
  return propType.type === 'ElementNode' && name !== 'children';
}

function convertType(propType: PropType, context: ConvertContext): DocsPropType {
  switch (propType.type) {
    case 'InterfaceNode':
      // Built-in types with symbol keys, e.g. iterables or `BigInt`.
      if (propType.types.some(([name]) => name.startsWith('__@'))) {
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
  const optional = types.some(isNullish);
  const nonNullish = optional ? types.filter((type) => !isNullish(type)) : types;

  if (types.length === 2 && types.some((type) => type.type === 'DOMElementNode')) {
    return { name: 'custom', description: 'HTML element' };
  }

  let literals = nonNullish.filter((type): type is LiteralType => type.type === 'LiteralNode');
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

  literals = literals.slice().sort(context.sortLiterals);
  if (literals.some((x) => x.value === 'true') && literals.some((x) => x.value === 'false')) {
    rest.push({ name: 'bool' });
    literals = literals.filter((x) => x.value !== 'true' && x.value !== 'false');
  }

  const enumType: DocsPropType | null =
    literals.length > 0
      ? { name: 'enum', value: literals.map((literal) => formatLiteral(literal.value)) }
      : null;

  if (rest.length === 0) {
    return enumType ?? { name: 'any' };
  }
  if (enumType === null && rest.length === 1) {
    return rest[0];
  }
  return { name: 'union', value: enumType ? [enumType, ...rest] : rest };
}

function getJsdocDefaultValue(jsDoc: string): { value: string } | undefined {
  const annotation = doctrine.parse(jsDoc, { sloppy: true });
  const defaultTag = annotation.tags.find((tag) => tag.title === 'default');
  if (defaultTag === undefined) {
    return undefined;
  }
  return { value: defaultTag.description || '' };
}

function isDeclaredNextToComponent(prop: PropTypeDefinition, typesFilename: string) {
  const unstyledFile = getUnstyledFilename(typesFilename, true);
  const unstyledPropsFile = unstyledFile.replace('.d.ts', '.types.ts');
  const propsFile = typesFilename.replace(/(\.d\.ts|\.tsx|\.ts)/g, 'Props.ts');
  const propsFileAlternative = typesFilename.replace(/(\.d\.ts|\.tsx|\.ts)/g, '.types.ts');

  return Array.from(prop.filenames).some(
    (filename) =>
      filename === typesFilename ||
      filename === unstyledFile ||
      filename === unstyledPropsFile ||
      filename === propsFile ||
      filename === propsFileAlternative,
  );
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

const REACT_NODE_MEMBERS = new Set([
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
        ? (type as Extract<DocsPropType, { name: 'union' }>).value.filter(
            (member) => !REACT_NODE_MEMBERS.has(member.name),
          )
        : [];
    return rest.length > 0
      ? { name: 'union', value: [{ name: 'node' }, ...rest] }
      : { name: 'node' };
  }

  if (members.length === 1 && /^(React\.)?Ref<.*>$/s.test(members[0])) {
    return { name: 'custom', description: 'ref' };
  }

  // The union can be extended through module augmentation.
  if (members.length === 1 && members[0].startsWith('OverridableStringUnion<')) {
    if (type.name === 'enum') {
      return { name: 'union', value: [type, { name: 'string' }] };
    }
    if (type.name === 'union') {
      const unionValue = (type as Extract<DocsPropType, { name: 'union' }>).value;
      if (!unionValue.some((member) => member.name === 'string')) {
        return { name: 'union', value: [...unionValue, { name: 'string' }] };
      }
    }
  }

  return type;
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

  const components = getPropTypesFromFile({
    filePath: typesFilename,
    project,
    checkDeclarations: true,
    shouldResolveObject: (data) => {
      const result = settings.shouldResolveObject?.(data);
      if (result !== undefined) {
        return result;
      }
      const { name, depth } = data;
      if (
        // Only document the shape of the prop itself, not of nested objects.
        depth > 1 ||
        name.toLowerCase().endsWith('classes') ||
        name === 'theme' ||
        name === 'ownerState' ||
        (name.endsWith('Props') && name !== 'componentsProps' && name !== 'slotProps')
      ) {
        return false;
      }
      return undefined;
    },
    shouldUseObjectForDate: settings.shouldUseObjectForDate,
  });

  const component = findComponent(components, componentName);
  if (!component) {
    return {};
  }

  const props: Record<string, ComponentPropDescriptor> = {};
  component.types
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((prop) => {
      if (!prop.jsDoc) {
        return;
      }

      let include = settings.shouldIncludeProp?.({
        componentName: component.name,
        prop: { name: prop.name, filenames: prop.filenames, jsDoc: prop.jsDoc },
        typesFilename,
        usedProps,
      });
      if (include === undefined) {
        include =
          prop.name === 'children' ||
          isDeclaredNextToComponent(prop, typesFilename) ||
          usedProps.includes(prop.name);
      }
      if (!include) {
        return;
      }

      const sortLiterals =
        settings.getSortLiteralUnions?.({ componentName: component.name, propName: prop.name }) ??
        defaultSortLiteralUnions;
      const type = applyTypeAnnotation(
        convertType(prop.propType, { propName: prop.name, sortLiterals }),
        prop.typeText,
      );

      props[prop.name] = {
        description: prop.jsDoc,
        required: !isOptional(prop.propType),
        type,
        defaultValue:
          defaultValues[prop.name] !== undefined ? { value: defaultValues[prop.name] } : undefined,
        jsdocDefaultValue: getJsdocDefaultValue(prop.jsDoc),
      };
    });

  return props;
}
