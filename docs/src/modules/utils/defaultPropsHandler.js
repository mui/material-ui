const astTypes = require('ast-types');
const { parse: parseDoctrine } = require('doctrine');
const { utils: docgenUtils } = require('react-docgen');

const { getPropertyName, isReactForwardRefCall, printValue, resolveToValue } = docgenUtils;

// based on https://github.com/reactjs/react-docgen/blob/735f39ef784312f4c0e740d4bfb812f0a7acd3d5/src/handlers/defaultPropsHandler.js#L1-L112
// adjusted for material-ui getThemedProps

const { namedTypes: types } = astTypes;

function getDefaultValue(propertyPath) {
  if (!types.AssignmentPattern.check(propertyPath.get('value').node)) {
    return null;
  }
  let path = propertyPath.get('value', 'right');

  let node = path.node;
  let defaultValue;
  if (types.Literal.check(node)) {
    defaultValue = node.raw;
  } else {
    if (types.AssignmentPattern.check(path.node)) {
      path = resolveToValue(path.get('right'));
    } else {
      path = resolveToValue(path);
    }
    if (types.ImportDeclaration.check(path.node)) {
      defaultValue = node.name;
    } else {
      node = path.node;
      defaultValue = printValue(path);
    }
  }
  if (typeof defaultValue !== 'undefined') {
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

function getJsdocDefaultValue(jsdoc) {
  const defaultTag = jsdoc.tags.find((tag) => tag.title === 'default');
  if (defaultTag === undefined) {
    return undefined;
  }
  return { value: defaultTag.description };
}

function getDefaultValuesFromProps(properties, documentation) {
  properties
    .filter((propertyPath) => types.Property.check(propertyPath.node))
    .forEach((propertyPath) => {
      const propName = getPropertyName(propertyPath);
      if (!propName) return;

      const propDescriptor = documentation.getPropDescriptor(propName);
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
      const defaultValue = getDefaultValue(propertyPath);

      if (jsdocDefaultValue != null && defaultValue != null) {
        throw new Error(
          `Can't have JavaScript default value and jsdoc @defaultValue in prop '${propName}'. Remove the @defaultValue if you need the JavaScript default value at runtime.`,
        );
      }
      const usedDefaultValue = defaultValue || jsdocDefaultValue;
      if (usedDefaultValue) {
        propDescriptor.defaultValue = usedDefaultValue;
      }
    });
}

function getRenderBody(componentDefinition) {
  const value = resolveToValue(componentDefinition);
  if (isReactForwardRefCall(value)) {
    return value.get('arguments', 0, 'body', 'body');
  }
  return value.get('body', 'body');
}

function getPropsPath(functionBody) {
  let propsPath;
  // visitVariableDeclarator, can't use visit body.node since it looses scope information
  functionBody
    .filter((path) => {
      return types.VariableDeclaration.check(path.node);
    })
    .forEach((path) => {
      const declaratorPath = path.get('declarations', 0);
      if (declaratorPath.get('init', 'name').value === 'props') {
        propsPath = declaratorPath.get('id');
      }
    });

  return propsPath;
}

module.exports = function defaultPropsHandler(documentation, componentDefinition) {
  const renderBody = getRenderBody(componentDefinition);
  const props = getPropsPath(renderBody);
  if (props !== undefined) {
    getDefaultValuesFromProps(props.get('properties'), documentation);
  }
};
