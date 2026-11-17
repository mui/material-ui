import { parse } from '@babel/parser';
import type { ParserPlugin } from '@babel/parser';
import traverse from '@babel/traverse';
import type { NodePath } from '@babel/traverse';
import * as t from '@babel/types';

export interface ComponentSourceInfo {
  /**
   * The text of the JSDoc block attached to the component definition.
   */
  description: string;
  /**
   * Default values found in the destructuring of `props` in the render function.
   */
  defaultValues: Record<string, string>;
  /**
   * Props read by the render function, either through destructuring or member access.
   */
  usedProps: string[];
}

const DOCBLOCK_HEADER = /^\*\s/;

function parseSource(src: string, filename: string) {
  const plugins: ParserPlugin[] = ['jsx'];
  if (/\.tsx?$/.test(filename)) {
    plugins.push('typescript');
  }
  return parse(src, { sourceType: 'module', plugins, sourceFilename: filename });
}

function getProgramPath(ast: t.File): NodePath<t.Program> {
  let programPath: NodePath<t.Program> | undefined;
  traverse(ast, {
    Program(path) {
      programPath = path;
      path.stop();
    },
  });
  return programPath!;
}

function getDocblock(path: NodePath): string | null {
  const comments = (path.node.leadingComments ?? []).filter(
    (comment) => comment.type === 'CommentBlock' && DOCBLOCK_HEADER.test(comment.value),
  );
  const lastComment = comments[comments.length - 1];
  if (!lastComment) {
    return null;
  }
  return lastComment.value.replace(/^[ \t]*\*[ \t]?/gm, '').trim();
}

function unwrapExpression(path: NodePath): NodePath {
  let current = path;
  while (
    current.isTSAsExpression() ||
    current.isTSSatisfiesExpression() ||
    current.isTSNonNullExpression() ||
    current.isParenthesizedExpression()
  ) {
    current = current.get('expression') as NodePath;
  }
  return current;
}

function isReactCall(path: NodePath, name: string): path is NodePath<t.CallExpression> {
  if (!path.isCallExpression()) {
    return false;
  }
  const callee = path.node.callee;
  return (
    t.isIdentifier(callee, { name }) ||
    (t.isMemberExpression(callee) && t.isIdentifier(callee.property, { name }))
  );
}

function resolveToValue(path: NodePath): NodePath {
  const unwrapped = unwrapExpression(path);
  if (unwrapped.isIdentifier()) {
    const binding = unwrapped.scope.getBinding(unwrapped.node.name);
    if (!binding) {
      return unwrapped;
    }
    if (binding.path.isVariableDeclarator()) {
      const init = binding.path.get('init');
      if (init.hasNode()) {
        return resolveToValue(init as NodePath);
      }
    }
    return binding.path;
  }
  if (unwrapped.isMemberExpression()) {
    const objectPath = resolveToValue(unwrapped.get('object'));
    const property = unwrapped.node.property;
    const propertyName = t.isIdentifier(property)
      ? property.name
      : t.isStringLiteral(property) && property.value;
    if (objectPath.isObjectExpression() && propertyName) {
      const propertyPath = objectPath
        .get('properties')
        .find(
          (candidate) =>
            candidate.isObjectProperty() &&
            (t.isIdentifier(candidate.node.key, { name: propertyName }) ||
              t.isStringLiteral(candidate.node.key, { value: propertyName })),
        );
      if (propertyPath?.isObjectProperty()) {
        return resolveToValue(propertyPath.get('value') as NodePath);
      }
    }
  }
  return unwrapped;
}

/**
 * Finds the expression or declaration that defines the component.
 */
function findComponentDefinition(
  programPath: NodePath<t.Program>,
  componentName: string,
): NodePath | null {
  const binding = programPath.scope.getBinding(componentName);
  if (binding) {
    if (binding.path.isVariableDeclarator()) {
      const init = binding.path.get('init');
      return init.hasNode() ? unwrapExpression(init as NodePath) : null;
    }
    if (binding.path.isFunctionDeclaration() || binding.path.isClassDeclaration()) {
      return binding.path;
    }
  }

  let definition: NodePath | null = null;
  programPath.get('body').forEach((statement) => {
    if (definition !== null || !statement.isExportDefaultDeclaration()) {
      return;
    }
    const declaration = statement.get('declaration') as NodePath;
    definition = declaration.isIdentifier() ? resolveToValue(declaration) : declaration;
  });
  return definition;
}

function getComponentDocblock(definition: NodePath): string | null {
  let statementPath: NodePath | null = definition;
  while (statementPath && !statementPath.isStatement()) {
    statementPath = statementPath.parentPath;
  }
  if (statementPath) {
    if (
      statementPath.parentPath?.isExportNamedDeclaration() ||
      statementPath.parentPath?.isExportDefaultDeclaration()
    ) {
      statementPath = statementPath.parentPath;
    }
    const description = getDocblock(statementPath);
    if (description) {
      return description;
    }
  }

  const wrapped =
    isReactCall(definition, 'forwardRef') || isReactCall(definition, 'memo')
      ? (definition.get('arguments')[0] as NodePath | undefined)
      : undefined;
  if (wrapped) {
    const inner = resolveToValue(wrapped);
    if (inner.node !== definition.node) {
      return getComponentDocblock(inner);
    }
  }
  return null;
}

type FunctionPath = NodePath<t.Function>;

function getRenderFunction(definition: NodePath): FunctionPath | null {
  const value = resolveToValue(definition);
  if (isReactCall(value, 'forwardRef') || isReactCall(value, 'memo')) {
    const firstArgument = value.get('arguments')[0] as NodePath | undefined;
    return firstArgument ? getRenderFunction(firstArgument) : null;
  }
  if (value.isFunction()) {
    return value;
  }
  return null;
}

function getPropertyName(path: NodePath<t.ObjectProperty>): string | null {
  const key = path.node.key;
  if (t.isIdentifier(key) && !path.node.computed) {
    return key.name;
  }
  if (t.isStringLiteral(key)) {
    return key.value;
  }
  return null;
}

function stripIndent(code: string): string {
  const lines = code.split('\n');
  const indents = lines
    .filter((line) => line.trim() !== '')
    .map((line) => line.match(/^[ \t]*/)![0].length);
  const minIndent = indents.length > 0 ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(minIndent)).join('\n');
}

function printValue(src: string, node: t.Node): string {
  let code = src.slice(node.start!, node.end!);
  if (code.endsWith(',') || code.endsWith(';')) {
    code = code.slice(0, -1);
  }
  const firstNewLine = code.indexOf('\n');
  if (firstNewLine === -1) {
    return code;
  }
  return code.slice(0, firstNewLine + 1) + stripIndent(code.slice(firstNewLine + 1));
}

function isImportBinding(path: NodePath): boolean {
  return (
    path.isImportSpecifier() || path.isImportDefaultSpecifier() || path.isImportNamespaceSpecifier()
  );
}

function getMemberExpressionRoot(path: NodePath<t.MemberExpression>): NodePath {
  let current: NodePath = path;
  while (current.isMemberExpression()) {
    current = current.get('object');
  }
  return current;
}

function getMemberExpressionString(node: t.Expression): string {
  if (t.isMemberExpression(node)) {
    const property = t.isIdentifier(node.property) ? `.${node.property.name}` : '';
    return `${getMemberExpressionString(node.object as t.Expression)}${property}`;
  }
  return t.isIdentifier(node) ? node.name : '';
}

function isImportedIdentifier(path: NodePath): boolean {
  if (!path.isIdentifier()) {
    return false;
  }
  const binding = path.scope.getBinding(path.node.name);
  return !!binding && isImportBinding(binding.path);
}

function getDefaultValue(src: string, valuePath: NodePath): string | null {
  if (!valuePath.isAssignmentPattern()) {
    return null;
  }
  const right = valuePath.get('right');

  // Keep references to imports as written, e.g. `duration.standard`.
  if (isImportedIdentifier(right)) {
    return (right.node as t.Identifier).name;
  }
  if (right.isMemberExpression() && isImportedIdentifier(getMemberExpressionRoot(right))) {
    return getMemberExpressionString(right.node);
  }

  const resolved = resolveToValue(right);
  if (isImportBinding(resolved) && right.isIdentifier()) {
    return right.node.name;
  }
  return printValue(src, resolved.node);
}

function getDefaultValues(src: string, renderFunction: FunctionPath): Record<string, string> {
  const body = renderFunction.get('body');
  if (!body.isBlockStatement()) {
    return {};
  }

  const propsPattern = body
    .get('body')
    .flatMap((statement) =>
      statement.isVariableDeclaration() ? [statement.get('declarations')[0]] : [],
    )
    .find(
      (declarator) =>
        declarator !== undefined &&
        t.isIdentifier(declarator.node.init, { name: 'props' }) &&
        t.isObjectPattern(declarator.node.id),
    )
    ?.get('id');

  if (!propsPattern?.isObjectPattern()) {
    return {};
  }

  const defaultValues: Record<string, string> = {};
  propsPattern.get('properties').forEach((propertyPath) => {
    if (!propertyPath.isObjectProperty()) {
      return;
    }
    const propName = getPropertyName(propertyPath);
    const defaultValue = getDefaultValue(src, propertyPath.get('value') as NodePath);
    if (propName && defaultValue !== null) {
      defaultValues[propName] = defaultValue;
    }
  });
  return defaultValues;
}

function getUsedProps(renderFunction: FunctionPath): string[] {
  const usedProps: string[] = [];

  function collect(node: t.Node | null | undefined) {
    if (t.isObjectPattern(node)) {
      node.properties.forEach((property) => {
        if (t.isObjectProperty(property)) {
          if (t.isStringLiteral(property.key)) {
            usedProps.push(property.key.value);
          } else if (t.isIdentifier(property.key)) {
            usedProps.push(property.key.name);
          }
        } else if (t.isIdentifier(property.argument)) {
          // Props accessed through the rest object, e.g. `other.foo`.
          collect(property.argument);
        }
      });
      return;
    }
    if (!t.isIdentifier(node)) {
      return;
    }
    const name = node.name;
    renderFunction.traverse({
      VariableDeclarator(path) {
        if (t.isIdentifier(path.node.init, { name }) && t.isObjectPattern(path.node.id)) {
          collect(path.node.id);
        } else if (name === 'inProps' && t.isIdentifier(path.node.id, { name: 'props' })) {
          // `const props = useDefaultProps({ props: inProps, … })`
          collect(path.node.id);
        }
      },
      MemberExpression(path) {
        if (t.isIdentifier(path.node.object, { name }) && t.isIdentifier(path.node.property)) {
          usedProps.push(path.node.property.name);
        }
      },
    });
  }

  collect(renderFunction.node.params[0]);
  return Array.from(new Set(usedProps));
}

export function parseComponentSource(
  src: string,
  filename: string,
  componentName: string,
): ComponentSourceInfo {
  const programPath = getProgramPath(parseSource(src, filename));
  const definition = findComponentDefinition(programPath, componentName);
  if (!definition) {
    return { description: '', defaultValues: {}, usedProps: [] };
  }

  const renderFunction = getRenderFunction(definition);
  return {
    description: getComponentDocblock(definition) ?? '',
    defaultValues: renderFunction ? getDefaultValues(src, renderFunction) : {},
    usedProps: renderFunction ? getUsedProps(renderFunction) : [],
  };
}

/**
 * Returns the JSDoc block of the top-level function declaration with the given name.
 */
export function getFunctionDescription(src: string, filename: string, name: string): string {
  const programPath = getProgramPath(parseSource(src, filename));
  const binding = programPath.scope.getBinding(name);
  if (!binding?.path.isFunctionDeclaration()) {
    return '';
  }
  return getComponentDocblock(binding.path) ?? '';
}
