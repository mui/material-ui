// @ts-check
const astTypes = require('ast-types');
const { parse: parseDoctrine } = require('doctrine');
const { utils: docgenUtils } = require('react-docgen');

const { getPropertyName, isReactForwardRefCall, printValue, resolveToValue } = docgenUtils;

// based on https://github.com/reactjs/react-docgen/blob/735f39ef784312f4c0e740d4bfb812f0a7acd3d5/src/handlers/defaultPropsHandler.js#L1-L112
// adjusted for material-ui getThemedProps

const { namedTypes: types } = astTypes;

/**
 * @param {import('react-docgen').NodePath} propertyPath
 * @param {import('react-docgen').Importer} importer
 * @returns {{ value: string; computed: boolean } | null}
 */
function getDefaultValue(propertyPath, importer) {
  if (!types.AssignmentPattern.check(propertyPath.get('value').node)) {
    return null;
  }
  /**
   * @type import('react-docgen').NodePath
   */
  let path = propertyPath.get('value', 'right');
  let node = path.node;

  /**
   * @type {string|undefined}
   */
  let defaultValue;
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

/**
 * @param {import('doctrine').Annotation} jsdoc
 * @return {{ value: string } | undefined}
 */
function getJsdocDefaultValue(jsdoc) {
  const defaultTag = jsdoc.tags.find((tag) => tag.title === 'default');
  if (defaultTag === undefined) {
    return undefined;
  }
  return { value: defaultTag.description || '' };
}

/**
 * @param {import('react-docgen').NodePath} properties
 * @param {import('react-docgen').Documentation} documentation
 * @param {import('react-docgen').Importer} importer
 * @returns {void}
 */
function getDefaultValuesFromProps(properties, documentation, importer) {
  const { props: documentedProps } = documentation.toObject();
  /**
   * @type Record<string, import('react-docgen').NodePath>
   */
  const implementedProps = {};
  properties
    .filter(
      /**
       * @param {import('react-docgen').NodePath} propertyPath
       */
      (propertyPath) => types.Property.check(propertyPath.node),
      undefined,
    )
    .forEach(
      /**
       * @param {import('react-docgen').NodePath} propertyPath
       */
      (propertyPath) => {
        const propName = getPropertyName(propertyPath);
        if (propName) {
          implementedProps[propName] = propertyPath;
        }
      },
    );

  // Sometimes we list props in .propTypes even though they're implemented by another component
  // These props are spread so they won't appear in the component implementation.
  Object.entries(documentedProps).forEach(([propName, propDescriptor]) => {
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

/**
 * @param {import('react-docgen').NodePath} componentDefinition
 * @param {import('react-docgen').Importer} importer
 * @returns import('react-docgen').NodePath
 */
function getRenderBody(componentDefinition, importer) {
  const value = resolveToValue(componentDefinition, importer);
  if (isReactForwardRefCall(value, importer)) {
    return value.get('arguments', 0, 'body', 'body');
  }
  return value.get('body', 'body');
}

/**
 * @param {import('react-docgen').NodePath} functionBody
 * @returns import('react-docgen').NodePath | undefined
 */
function getPropsPath(functionBody) {
  /**
   * @type import('react-docgen').NodePath | undefined
   */
  let propsPath;
  // visitVariableDeclarator, can't use visit body.node since it looses scope information
  functionBody
    .filter(
      /**
       * @param {import('react-docgen').NodePath} path
       */
      (path) => {
        return types.VariableDeclaration.check(path.node);
      },
      undefined,
    )
    .forEach(
      /**
       * @param {import('react-docgen').NodePath} path
       */
      (path) => {
        const declaratorPath = path.get('declarations', 0);
        // find `const {} = props`
        // but not `const styleProps = props`
        if (
          declaratorPath.get('init', 'name').value === 'props' &&
          declaratorPath.get('id', 'type').value === 'ObjectPattern'
        ) {
          propsPath = declaratorPath.get('id');
        }
      },
    );

  return propsPath;
}

/**
 * @type {import('react-docgen').Handler}
 */
const defaultPropsHandler = (documentation, componentDefinition, importer) => {
  const renderBody = getRenderBody(componentDefinition, importer);
  const props = getPropsPath(renderBody);
  if (props !== undefined) {
    getDefaultValuesFromProps(props.get('properties'), documentation, importer);
  }
};

module.exports = defaultPropsHandler;
