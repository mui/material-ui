import { namedTypes as types } from 'ast-types';
import { parse as parseDoctrine, Annotation } from 'doctrine';
import { utils as docgenUtils, NodePath, Documentation, Importer, Handler } from 'react-docgen';

const { getPropertyName, isReactForwardRefCall, printValue, resolveToValue } = docgenUtils;

// based on https://github.com/reactjs/react-docgen/blob/735f39ef784312f4c0e740d4bfb812f0a7acd3d5/src/handlers/defaultPropsHandler.js#L1-L112
// adjusted for material-ui getThemedProps

function getDefaultValue(propertyPath: NodePath, importer: Importer) {
  if (!types.AssignmentPattern.check(propertyPath.get('value').node)) {
    return null;
  }

  let path: NodePath = propertyPath.get('value', 'right');
  let node = path.node;

  let defaultValue: string | undefined;
  if (types.Literal.check(path.node)) {
    // @ts-expect-error TODO upstream fix
    defaultValue = node.raw;
  } else {
    if (types.AssignmentPattern.check(path.node)) {
      path = resolveToValue(path.get('right'), importer);
    } else {
      path = resolveToValue(path, importer);
    }
    if (types.ImportDeclaration.check(path.node)) {
      if (types.TSAsExpression.check(node)) {
        node = node.expression;
      }
      if (!types.Identifier.check(node)) {
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
      computed:
        types.CallExpression.check(node) ||
        types.MemberExpression.check(node) ||
        types.Identifier.check(node),
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
  properties: NodePath,
  documentation: Documentation,
  importer: Importer,
) {
  const { props: documentedProps } = documentation.toObject();
  const implementedProps: Record<string, NodePath> = {};
  properties
    .filter((propertyPath: NodePath) => types.Property.check(propertyPath.node), undefined)
    .forEach((propertyPath: NodePath) => {
      const propName = getPropertyName(propertyPath);
      if (propName) {
        implementedProps[propName] = propertyPath;
      }
    });

  // Sometimes we list props in .propTypes even though they're implemented by another component
  // These props are spread so they won't appear in the component implementation.
  Object.entries(documentedProps || []).forEach(([propName, propDescriptor]) => {
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
      const defaultValue = getDefaultValue(propertyPath, importer);
      if (defaultValue) {
        propDescriptor.defaultValue = defaultValue;
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

const defaultPropsHandler: Handler = (documentation, componentDefinition, importer) => {
  const props = getExplicitPropsDeclaration(componentDefinition, importer);

  getDefaultValuesFromProps(props?.get('properties') ?? [], documentation, importer);
};

export default defaultPropsHandler;
