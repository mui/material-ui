import { parse as parseDoctrine, Annotation } from 'doctrine';
import { utils as docgenUtils, NodePath, PropDescriptor, Handler } from 'react-docgen';
import DocumentationBuilder, { DefaultValueDescriptor } from 'react-docgen/dist/Documentation';
import { ComponentNode } from 'react-docgen/dist/resolver';

const {
  getPropertyName,
  printValue,
  resolveToValue,
  getMemberValuePath,
  resolveFunctionDefinitionToReturnValue,
  isReactComponentClass,
  isReactForwardRefCall,
} = docgenUtils;

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
  if (!defaultTag) {
    return undefined;
  }
  return { value: defaultTag.description || '' };
}

function getStatelessPropsPath(componentDefinition: NodePath): NodePath | undefined {
  let value: NodePath = componentDefinition;

  if (isReactForwardRefCall(componentDefinition)) {
    value = resolveToValue(componentDefinition.get('arguments')[0]!);
  }

  if (!value.isFunction()) {
    return undefined;
  }

  return value.get('params')[0];
}

function getDefaultPropsPath(componentDefinition: NodePath<ComponentNode>): NodePath | null {
  let defaultPropsPath: NodePath | null = getMemberValuePath(componentDefinition, 'defaultProps');

  if (!defaultPropsPath) {
    return null;
  }

  defaultPropsPath = resolveToValue(defaultPropsPath);
  if (!defaultPropsPath) {
    return null;
  }

  if (
    defaultPropsPath.isFunctionExpression() ||
    defaultPropsPath.isFunctionDeclaration() ||
    defaultPropsPath.isClassMethod() ||
    defaultPropsPath.isObjectMethod()
  ) {
    // Find the value that is returned from the function and process it if it is
    // an object literal.
    const returnValue = resolveFunctionDefinitionToReturnValue(defaultPropsPath);

    if (returnValue && returnValue.isObjectExpression()) {
      defaultPropsPath = returnValue;
    }
  }

  return defaultPropsPath;
}

function getDefaultValuesFromProps(
  properties: Array<NodePath>,
  documentation: DocumentationBuilder,
  isStateless: boolean,
): void {
  properties.forEach((propertyPath) => {
    if (propertyPath.isObjectProperty()) {
      const propName = getPropertyName(propertyPath);

      if (!propName) {
        return;
      }

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
      const propDescriptor: PropDescriptor & {
        jsdocDefaultValue?: { computed?: boolean; value: string };
      } = documentation.getPropDescriptor(propName);

      const jsdocDefaultValue = getJsdocDefaultValue(
        parseDoctrine(propDescriptor.description || '', { sloppy: true }),
      );
      if (jsdocDefaultValue) {
        propDescriptor.jsdocDefaultValue = jsdocDefaultValue;
      }

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

const defaultPropsHandler: Handler = function defaultPropsHandler(
  documentation: DocumentationBuilder,
  componentDefinition: NodePath<ComponentNode>,
): void {
  let statelessProps: NodePath | undefined;
  const defaultPropsPath = getDefaultPropsPath(componentDefinition);

  /**
   * function, lazy, memo, forwardRef etc components can resolve default props as well
   */
  if (!isReactComponentClass(componentDefinition)) {
    statelessProps = getStatelessPropsPath(componentDefinition as NodePath);
  }

  // Do both statelessProps and defaultProps if both are available so defaultProps can override
  if (statelessProps && statelessProps.isObjectPattern()) {
    getDefaultValuesFromProps(statelessProps.get('properties'), documentation, true);
  }
  if (defaultPropsPath && defaultPropsPath.isObjectExpression()) {
    getDefaultValuesFromProps(defaultPropsPath.get('properties'), documentation, false);
  }
};

export default defaultPropsHandler;
