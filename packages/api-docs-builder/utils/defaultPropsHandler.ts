import type { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { parse as parseDoctrine, Annotation } from 'doctrine';
import { utils, type Handler } from 'react-docgen';

const { getPropertyName, isReactForwardRefCall, printValue, resolveToValue } = utils;

// based on https://github.com/reactjs/react-docgen/blob/735f39ef784312f4c0e740d4bfb812f0a7acd3d5/src/handlers/defaultPropsHandler.js#L1-L112
// adjusted for material-ui getThemedProps

function getDefaultValue(propertyPath: NodePath) {
  const valueNode = propertyPath.get('value');
  if (!Array.isArray(valueNode) && !valueNode.isAssignmentPattern()) {
    return null;
  }

  if (Array.isArray(valueNode)) {
    return null;
  }

  let path: NodePath = valueNode.get('right') as NodePath;
  let node = path.node;

  let defaultValue: string | undefined;
  if (path.isLiteral() && 'raw' in path.node) {
    defaultValue = (path.node as any).raw;
  } else {
    if (path.isAssignmentPattern()) {
      path = resolveToValue(path.get('right') as NodePath);
    } else {
      path = resolveToValue(path);
    }
    if (path.parentPath?.isImportDeclaration()) {
      if (t.isTSAsExpression(node)) {
        node = node.expression;
      }
      if (!t.isIdentifier(node)) {
        const locationHint =
          node.loc != null ? `${node.loc.start.line}:${node.loc.start.column}` : 'unknown location';
        throw new TypeError(
          `Unable to follow data flow. Expected an 'Identifier' resolve to an 'ImportDeclaration'. Instead attempted to resolve a '${node.type}' at ${locationHint}.`,
        );
      }
      defaultValue = node.name;
    } else {
      node = path.node;
      defaultValue = printValue(path);
    }
  }
  if (defaultValue !== undefined) {
    return {
      value: defaultValue,
      computed: t.isCallExpression(node) || t.isMemberExpression(node) || t.isIdentifier(node),
    };
  }

  return null;
}

function getJsdocDefaultValue(jsdoc: Annotation): { value: string } | undefined {
  const defaultTag = jsdoc.tags.find((tag) => tag.title === 'default');
  if (defaultTag === undefined) {
    return undefined;
  }
  return { value: defaultTag.description || '' };
}

function getDefaultValuesFromProps(properties: NodePath, documentedProps: Record<string, any>) {
  const implementedProps: Record<string, NodePath> = {};

  if (properties.isObjectPattern()) {
    properties.get('properties').forEach((propertyPath) => {
      if (propertyPath.isObjectProperty()) {
        const propName = getPropertyName(propertyPath);
        if (propName) {
          implementedProps[propName] = propertyPath;
        }
      }
    });
  }

  // Sometimes we list props in .propTypes even though they're implemented by another component
  // These props are spread so they won't appear in the component implementation.
  Object.entries(documentedProps || []).forEach(([propName, propDescriptor]: [string, any]) => {
    if (propDescriptor.description === undefined) {
      // private props have no propsType validator and therefore
      // not description.
      // They are either not subject to eslint react/prop-types
      // or are and then we catch these issues during linting.
      return;
    }

    const jsdocDefaultValue = getJsdocDefaultValue(
      parseDoctrine(propDescriptor.description, {
        sloppy: true,
      }),
    );
    if (jsdocDefaultValue) {
      propDescriptor.jsdocDefaultValue = jsdocDefaultValue;
    }

    const propertyPath = implementedProps[propName];
    if (propertyPath !== undefined) {
      const defaultValue = getDefaultValue(propertyPath);
      if (defaultValue) {
        propDescriptor.defaultValue = defaultValue;
      }
    }
  });
}

function getRenderBody(componentDefinition: NodePath): NodePath | null {
  const value = resolveToValue(componentDefinition);
  if (isReactForwardRefCall(value)) {
    const args = value.get('arguments');
    if (Array.isArray(args) && args.length > 0) {
      const firstArg = args[0];
      if (firstArg.isArrowFunctionExpression() || firstArg.isFunctionExpression()) {
        const body = firstArg.get('body');
        if (!Array.isArray(body) && body.isBlockStatement()) {
          return body.get('body') as unknown as NodePath;
        }
      }
    }
    return null;
  }
  if (
    componentDefinition.isArrowFunctionExpression() ||
    componentDefinition.isFunctionExpression() ||
    componentDefinition.isFunctionDeclaration()
  ) {
    const body = componentDefinition.get('body');
    if (!Array.isArray(body) && body.isBlockStatement()) {
      return body.get('body') as unknown as NodePath;
    }
  }
  return null;
}

/**
 * Handle the case where `props` is explicitly declared with/without `React.forwardRef(…)`:
 *
 * @example
 * const Component = React.forwardRef((props, ref) => {
 *   const { className, ...other } = props;
 * })
 */
function getExplicitPropsDeclaration(componentDefinition: NodePath): NodePath | undefined {
  const functionNode = getRenderBody(componentDefinition);

  // No function body available to inspect.
  if (!functionNode) {
    return undefined;
  }

  let propsPath: NodePath | undefined;

  // Check if functionNode is iterable (array of statements)
  // eslint-disable-next-line no-nested-ternary
  const statements = Array.isArray(functionNode)
    ? functionNode
    : (functionNode as any).node
      ? [functionNode]
      : [];

  for (const path of statements) {
    if (path.isVariableDeclaration && path.isVariableDeclaration()) {
      const declarations = path.get('declarations');
      if (Array.isArray(declarations) && declarations.length > 0) {
        const declaratorPath = declarations[0];
        const init = declaratorPath.get('init');
        const id = declaratorPath.get('id');

        // find `const {} = props`
        // but not `const ownerState = props`
        if (
          !Array.isArray(init) &&
          init.isIdentifier() &&
          init.node.name === 'props' &&
          !Array.isArray(id) &&
          id.isObjectPattern()
        ) {
          propsPath = id;
          break;
        }
      }
    }
  }

  if (!propsPath) {
    // Try to get component name for error message
    let componentName = 'Unknown';
    if (componentDefinition.isFunctionDeclaration() && componentDefinition.node.id) {
      componentName = componentDefinition.node.id.name;
    }
    console.error(`${componentName}: could not find props declaration to generate jsdoc table. The component declaration should be in this format:

  function Component(props: ComponentProps) {
    const { ...spreadAsUsual } = props;
    ...
  }
    `);
  }

  return propsPath;
}

const defaultPropsHandler: Handler = (documentation, componentDefinition) => {
  const props = getExplicitPropsDeclaration(componentDefinition);

  // Get documented props from the documentation builder
  const docObject = documentation.build();
  const documentedProps = docObject.props || {};

  if (props && props.isObjectPattern()) {
    getDefaultValuesFromProps(props, documentedProps);
  }
};

export default defaultPropsHandler;
