import _ from 'lodash';
import * as t from './types';

export interface GenerateOptions {
  /**
   * Enable/disable the default sorting (ascending) or provide your own sort function
   * @default true
   */
  sortProptypes?: boolean | ((a: t.PropTypeDefinition, b: t.PropTypeDefinition) => 0 | -1 | 1);

  /**
   * The name used when importing prop-types
   * @default 'PropTypes'
   */
  importedName?: string;

  /**
   * Enable/disable including JSDoc comments
   * @default true
   */
  includeJSDoc?: boolean;

  /**
   * Previous source code of the validator for each prop type
   */
  previousPropTypesSource?: Map<string, string>;

  /**
   * Given the `prop`, the `previous` source of the validator and the `generated` source:
   * What source should be injected? `previous` is `undefined` if the validator
   * didn't exist before
   * @default Uses `generated` source
   */
  reconcilePropTypes?(
    proptype: t.PropTypeDefinition,
    previous: string | undefined,
    generated: string,
  ): string;

  /**
   * Control which PropTypes are included in the final result
   * @param proptype The current PropType about to be converted to text
   */
  shouldInclude?(proptype: t.PropTypeDefinition): boolean | undefined;

  /**
   * A comment that will be added to the start of the PropTypes code block
   * @example
   * foo.propTypes = {
   *  // Comment goes here
   * }
   */
  comment?: string;

  /**
   * Overrides the given `sortLiteralUnions` based on the proptype.
   * If `undefined` is returned the default `sortLiteralUnions` will be used.
   */
  getSortLiteralUnions?: (
    component: t.Component,
    propType: t.PropTypeDefinition,
  ) => ((a: t.LiteralType, b: t.LiteralType) => number) | undefined;

  /**
   * By default literals in unions are sorted by:
   * - numbers last, ascending
   * - anything else by their stringified value using localeCompare
   */
  sortLiteralUnions?: (a: t.LiteralType, b: t.LiteralType) => number;
}

function defaultSortLiteralUnions(a: t.LiteralType, b: t.LiteralType) {
  const { value: valueA } = a;
  const { value: valueB } = b;
  // numbers ascending
  if (typeof valueA === 'number' && typeof valueB === 'number') {
    return valueA - valueB;
  }
  // numbers last
  if (typeof valueA === 'number') {
    return 1;
  }
  if (typeof valueB === 'number') {
    return -1;
  }
  // sort anything else by their stringified value
  return String(valueA).localeCompare(String(valueB));
}

/**
 * Generates code from the given component
 * @param component The component to convert to code
 * @param options The options used to control the way the code gets generated
 */
export function generate(component: t.Component, options: GenerateOptions = {}): string {
  const {
    sortProptypes = true,
    importedName = 'PropTypes',
    includeJSDoc = true,
    previousPropTypesSource = new Map<string, string>(),
    reconcilePropTypes = (_prop: t.PropTypeDefinition, _previous: string, generated: string) =>
      generated,
    shouldInclude,
    getSortLiteralUnions = () => defaultSortLiteralUnions,
  } = options;

  function jsDoc(documentedNode: t.PropTypeDefinition | t.LiteralType): string {
    if (!includeJSDoc || !documentedNode.jsDoc) {
      return '';
    }
    return `/**\n* ${documentedNode.jsDoc
      .split(/\r?\n/)
      .reduce((prev, curr) => `${prev}\n* ${curr}`)}\n*/\n`;
  }

  function generatePropType(
    propType: t.PropType,
    context: { component: t.Component; propTypeDefinition: t.PropTypeDefinition },
  ): string {
    if (propType.type === 'InterfaceNode') {
      return `${importedName}.shape({\n${propType.types
        .map((type) => generatePropType(type, context))
        .join('\n')}\n})`;
    }

    if (propType.type === 'FunctionNode') {
      return `${importedName}.func`;
    }

    if (propType.type === 'StringNode') {
      return `${importedName}.string`;
    }

    if (propType.type === 'boolean') {
      return `${importedName}.bool`;
    }

    if (propType.type === 'NumericNode') {
      return `${importedName}.number`;
    }

    if (propType.type === 'LiteralNode') {
      return `${importedName}.oneOf([${jsDoc(propType)}${propType.value}])`;
    }

    if (propType.type === 'ObjectNode') {
      return `${importedName}.object`;
    }

    if (propType.type === 'any') {
      return `${importedName}.any`;
    }

    if (propType.type === 'ElementNode') {
      return `${importedName}.${propType.elementType}`;
    }

    if (propType.type === 'InstanceOfNode') {
      return `${importedName}.instanceOf(${propType.instance})`;
    }

    if (propType.type === 'DOMElementNode') {
      return `function (props, propName) {
			if (props[propName] == null) {
				return ${
          propType.optional
            ? 'null'
            : `new Error("Prop '" + propName + "' is required but wasn't specified")`
        }
			} else if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
				return new Error("Expected prop '" + propName + "' to be of type Element")
			}
		}`;
    }

    if (propType.type === 'array') {
      if (propType.arrayType.type === 'any') {
        return `${importedName}.array`;
      }

      return `${importedName}.arrayOf(${generatePropType(propType.arrayType, context)})`;
    }

    if (propType.type === 'UnionNode') {
      let [literals, rest] = _.partition(
        t.uniqueUnionTypes(propType).types,
        (type): type is t.LiteralType => type.type === 'LiteralNode',
      );

      const sortLiteralUnions =
        getSortLiteralUnions(context.component, context.propTypeDefinition) ||
        defaultSortLiteralUnions;
      literals = literals.sort(sortLiteralUnions);

      const nodeToStringName = (type: t.PropType): string => {
        if (type.type === 'InstanceOfNode') {
          return `${type.type}.${type.instance}`;
        }
        if (type.type === 'InterfaceNode') {
          // An interface is PropTypes.shape
          // Use `ShapeNode` to get it sorted in the correct order
          return `ShapeNode`;
        }

        return type.type;
      };

      rest = rest.sort((a, b) => nodeToStringName(a).localeCompare(nodeToStringName(b)));

      if (literals.find((x) => x.value === 'true') && literals.find((x) => x.value === 'false')) {
        rest.push(t.createBooleanType());
        literals = literals.filter((x) => x.value !== 'true' && x.value !== 'false');
      }

      const literalProps =
        literals.length !== 0
          ? `${importedName}.oneOf([${literals
              .map((x) => `${jsDoc(x)}${x.value}`)
              .reduce((prev, curr) => `${prev},${curr}`)}])`
          : '';

      if (rest.length === 0) {
        return literalProps;
      }

      if (literals.length === 0 && rest.length === 1) {
        return generatePropType(rest[0], context);
      }

      return `${importedName}.oneOfType([${
        literalProps ? `${literalProps}, ` : ''
      }${rest
        .map((type) => generatePropType(type, context))
        .reduce((prev, curr) => `${prev},${curr}`)}])`;
    }

    throw new Error(
      `Nothing to handle node of type "${propType.type}" in "${context.propTypeDefinition.name}"`,
    );
  }

  function generatePropTypeDefinition(
    propTypeDefinition: t.PropTypeDefinition,
    context: { component: t.Component },
  ): string {
    let isOptional = false;
    let propType = { ...propTypeDefinition.propType };

    if (
      propType.type === 'UnionNode' &&
      propType.types.some((type) => type.type === 'UndefinedNode')
    ) {
      isOptional = true;
      propType.types = propType.types.filter(
        (type) =>
          type.type !== 'UndefinedNode' && !(type.type === 'LiteralNode' && type.value === 'null'),
      );
      if (propType.types.length === 1 && propType.types[0].type !== 'LiteralNode') {
        propType = propType.types[0];
      }
    }

    console.log(isOptional, propTypeDefinition);

    if (propType.type === 'DOMElementNode') {
      propType.optional = isOptional;
      // Handled internally in the validate function
      isOptional = true;
    }

    const validatorSource = reconcilePropTypes(
      propTypeDefinition,
      previousPropTypesSource.get(propTypeDefinition.name),
      `${generatePropType(propType, { component: context.component, propTypeDefinition })}${
        isOptional ? '' : '.isRequired'
      }`,
    );

    return `${jsDoc(propTypeDefinition)}"${propTypeDefinition.name}": ${validatorSource},`;
  }

  const propTypes = component.types.slice();

  if (typeof sortProptypes === 'function') {
    propTypes.sort(sortProptypes);
  } else if (sortProptypes === true) {
    propTypes.sort((a, b) => a.name.localeCompare(b.name));
  }

  let filteredNodes = propTypes;
  if (shouldInclude) {
    filteredNodes = filteredNodes.filter((type) => shouldInclude(type));
  }

  if (filteredNodes.length === 0) {
    return '';
  }

  const generated = filteredNodes
    .map((prop) => generatePropTypeDefinition(prop, { component }))
    .reduce((prev, curr) => `${prev}\n${curr}`);
  if (generated.length === 0) {
    return '';
  }

  const comment =
    options.comment &&
    `// ${options.comment.split(/\r?\n/gm).reduce((prev, curr) => `${prev}\n// ${curr}`)}\n`;

  return `${component.name}.propTypes = {\n${comment !== undefined ? comment : ''}${generated}\n}`;
}
