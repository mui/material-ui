import { namedTypes as types } from 'ast-types';
import { parse as parseDoctrine, Annotation } from 'doctrine';
import { utils as docgenUtils, NodePath, Documentation, Importer, Handler } from 'react-docgen';
import { DefaultValueDescriptor } from 'react-docgen/dist/Documentation';
import { ComponentNode } from 'react-docgen/dist/resolver';

const { getPropertyName, isReactForwardRefCall, printValue, resolveToValue } = docgenUtils;

// based on https://github.com/reactjs/react-docgen/blob/735f39ef784312f4c0e740d4bfb812f0a7acd3d5/src/handlers/defaultPropsHandler.js#L1-L112
// adjusted for material-ui getThemedProps

function getDefaultValue(path: NodePath): DefaultValueDescriptor | null {
  let defaultValue: string | undefined;
  let resolvedPath = path;
  let valuePath = path;

  if (path.isBooleanLiteral()) {
    defaultValue = `${path.node.value}`;
  } else if (path.isNullLiteral()) {
    defaultValue = 'null';
  } else if (path.isLiteral()) {
    defaultValue = path.node.extra?.raw as string;
  } else {
    if (path.isAssignmentPattern()) {
      resolvedPath = resolveToValue(path.get('right'));
    } else {
      resolvedPath = resolveToValue(path);
    }
    if (resolvedPath.parentPath?.isImportDeclaration() && path.isIdentifier()) {
      defaultValue = path.node.name;
    } else {
      valuePath = resolvedPath;
      defaultValue = printValue(resolvedPath);
    }
  }
  if (typeof defaultValue !== 'undefined') {
    return {
      value: defaultValue,
      computed:
        valuePath.isCallExpression() || valuePath.isMemberExpression() || valuePath.isIdentifier(),
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

function getDefaultValuesFromProps(
  properties: Array<NodePath<ObjectMethod | ObjectProperty | RestElement | SpreadElement>>,
  documentation: Documentation,
  isStateless: boolean,
): void {
  properties.forEach((propertyPath) => {
    if (propertyPath.isObjectProperty()) {
      const propName = getPropertyName(propertyPath);

      if (!propName) return;

      let valuePath = propertyPath.get('value');

      if (isStateless) {
        if (valuePath.isAssignmentPattern()) {
          valuePath = valuePath.get('right');
        } else {
          // Don't evaluate property if component is functional and the node is not an AssignmentPattern
          return;
        }
      }

      // Initialize the prop descriptor here after the early return from above
      const propDescriptor = documentation.getPropDescriptor(propName);
      const defaultValue = getDefaultValue(valuePath);

      if (defaultValue) {
        propDescriptor.defaultValue = defaultValue;
      }
    } else if (propertyPath.isSpreadElement()) {
      const resolvedValuePath = resolveToValue(propertyPath.get('argument'));

      if (resolvedValuePath.isObjectExpression()) {
        getDefaultValuesFromProps(resolvedValuePath.get('properties'), documentation, isStateless);
      }
    }
  });
}

function getRenderBody(componentDefinition: NodePath, importer: Importer): NodePath {
  const value = resolveToValue(componentDefinition, importer);
  if (isReactForwardRefCall(value, importer)) {
    return value.get('arguments', 0, 'body', 'body');
  }
  return value.get('body', 'body');
}

/**
 * Handle the case where `props` is explicitly declared with/without `React.forwardRef(…)`:
 *
 * @example
 * const Component = React.forwardRef((props, ref) => {
 *   const { className, ...other } = props;
 * })
 */
function getExplicitPropsDeclaration(
  componentDefinition: NodePath,
  importer: Importer,
): NodePath | undefined {
  const functionNode = getRenderBody(componentDefinition, importer);

  // No function body available to inspect.
  if (!functionNode.value) {
    return undefined;
  }

  let propsPath: NodePath | undefined;
  // visitVariableDeclarator, can't use visit body.node since it looses scope information
  functionNode
    .filter((path: NodePath) => {
      return types.VariableDeclaration.check(path.node);
    }, undefined)
    .forEach((path: NodePath) => {
      const declaratorPath = path.get('declarations', 0);
      // find `const {} = props`
      // but not `const ownerState = props`
      if (
        declaratorPath.get('init', 'name').value === 'props' &&
        declaratorPath.get('id', 'type').value === 'ObjectPattern'
      ) {
        propsPath = declaratorPath.get('id');
      }
    });

  if (!propsPath) {
    console.error(`${functionNode.parent.value.id.name}: could not find props declaration to generate jsdoc table. The component declaration should be in this format:

  function Component(props: ComponentProps) {
    const { ...spreadAsUsual } = props;
    ...
  }
    `);
  }

  return propsPath;
}

function defaultPropsHandler(
  documentation: Documentation,
  componentDefinition: NodePath<ComponentNode>,
): void {
  const props = getExplicitPropsDeclaration(componentDefinition, importer);

  getDefaultValuesFromProps(props?.get('properties') ?? [], documentation, importer);
} as Handler;

export default defaultPropsHandler;
