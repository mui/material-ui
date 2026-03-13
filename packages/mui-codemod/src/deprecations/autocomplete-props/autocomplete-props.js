import movePropIntoSlots from '../utils/movePropIntoSlots';
import movePropIntoSlotProps from '../utils/movePropIntoSlotProps';
import replaceComponentsWithSlots from '../utils/replaceComponentsWithSlots';
import findComponentJSX from '../../util/findComponentJSX';
import findComponentDefaultProps from '../../util/findComponentDefaultProps';
import assignObject from '../../util/assignObject';
import appendAttribute from '../../util/appendAttribute';

function isNonComputedKey(j, path) {
  const parent = path.parent.node;

  return (
    (j.ObjectProperty.check(parent) || j.Property.check(parent)) &&
    parent.key === path.node &&
    !parent.computed
  );
}

function renameIdentifiersInScope(j, scopePath, oldName, newName) {
  const bindingScope = scopePath.scope.lookup(oldName);

  if (!bindingScope) {
    return;
  }

  j(bindingScope.path)
    .find(j.Identifier, { name: oldName })
    .filter((path) => {
      if (isNonComputedKey(j, path)) {
        return false;
      }

      return path.scope.lookup(oldName) === bindingScope;
    })
    .replaceWith(() => j.identifier(newName));
}

function renameRenderTagsCallback(j, callbackPath) {
  const getTagPropsParam = callbackPath.node.params[1];

  if (getTagPropsParam?.type === 'Identifier' && getTagPropsParam.name === 'getTagProps') {
    renameIdentifiersInScope(j, callbackPath, 'getTagProps', 'getItemProps');
  }
}

function renameRenderTagsProp(j, propertyPath) {
  if (propertyPath.node.key.type === 'Identifier') {
    propertyPath.node.key.name = 'renderValue';
  }

  if (
    propertyPath.node.value.type === 'ArrowFunctionExpression' ||
    propertyPath.node.value.type === 'FunctionExpression'
  ) {
    renameRenderTagsCallback(j, propertyPath.get('value'));
  }
}

function renameUseAutocompleteReturnMembers(j, root) {
  const renamedMembers = new Map([
    ['getTagProps', 'getItemProps'],
    ['focusedTag', 'focusedItem'],
  ]);

  root
    .find(j.VariableDeclarator)
    .filter((path) => {
      const { id, init } = path.node;

      return (
        id.type === 'ObjectPattern' &&
        init?.type === 'CallExpression' &&
        init.callee.type === 'Identifier' &&
        init.callee.name === 'useAutocomplete'
      );
    })
    .forEach((path) => {
      path.node.id.properties.forEach((property) => {
        if (property.type !== 'ObjectProperty' || property.key.type !== 'Identifier') {
          return;
        }

        const nextName = renamedMembers.get(property.key.name);

        if (!nextName) {
          return;
        }

        const isShorthand = property.shorthand === true;
        const localName = property.value.type === 'Identifier' ? property.value.name : null;

        property.key.name = nextName;

        if (isShorthand && localName) {
          renameIdentifiersInScope(j, path, localName, nextName);
          property.shorthand = true;
        }
      });
    });
}

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  movePropIntoSlots(j, {
    root,
    packageName: options.packageName,
    componentName: 'Autocomplete',
    propName: 'PaperComponent',
    slotName: 'paper',
  });

  movePropIntoSlots(j, {
    root,
    packageName: options.packageName,
    componentName: 'Autocomplete',
    propName: 'PopperComponent',
    slotName: 'popper',
  });

  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'Autocomplete',
    propName: 'ListboxProps',
    slotName: 'listbox',
  });

  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'Autocomplete',
    propName: 'ChipProps',
    slotName: 'chip',
  });

  replaceComponentsWithSlots(j, {
    root,
    packageName: options.packageName,
    componentName: 'Autocomplete',
  });

  // Move ListboxComponent JSX prop into slotProps.listbox.component
  findComponentJSX(
    j,
    { root, packageName: options.packageName, componentName: 'Autocomplete' },
    (elementPath) => {
      const element = elementPath.node;

      element.openingElement.attributes.forEach((attribute, index) => {
        if (attribute.type !== 'JSXAttribute' || attribute.name.name !== 'renderTags') {
          return;
        }

        attribute.name.name = 'renderValue';

        if (
          attribute.value?.type === 'JSXExpressionContainer' &&
          (attribute.value.expression.type === 'ArrowFunctionExpression' ||
            attribute.value.expression.type === 'FunctionExpression')
        ) {
          renameRenderTagsCallback(
            j,
            elementPath.get('openingElement', 'attributes', index, 'value', 'expression'),
          );
        }
      });

      const propIndex = element.openingElement.attributes.findIndex(
        (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'ListboxComponent',
      );

      if (propIndex !== -1) {
        const removedValue = element.openingElement.attributes.splice(propIndex, 1)[0].value
          .expression;
        let hasSlotProps = false;
        element.openingElement.attributes.forEach((attr) => {
          if (attr.name?.name === 'slotProps') {
            hasSlotProps = true;
            const slots = attr.value.expression;
            const slotIndex = slots.properties.findIndex((prop) => prop?.key?.name === 'listbox');
            if (slotIndex === -1) {
              assignObject(j, {
                target: attr,
                key: 'listbox',
                expression: j.objectExpression([
                  j.objectProperty(j.identifier('component'), removedValue),
                ]),
              });
            } else {
              const slotPropsSlotValue = slots.properties.splice(slotIndex, 1)[0].value;
              assignObject(j, {
                target: attr,
                key: 'listbox',
                expression: j.objectExpression([
                  j.objectProperty(j.identifier('component'), removedValue),
                  j.spreadElement(slotPropsSlotValue),
                ]),
              });
            }
          }
        });

        if (!hasSlotProps) {
          appendAttribute(j, {
            target: element,
            attributeName: 'slotProps',
            expression: j.objectExpression([
              j.objectProperty(
                j.identifier('listbox'),
                j.objectExpression([j.objectProperty(j.identifier('component'), removedValue)]),
              ),
            ]),
          });
        }
      }
    },
  );

  // Move ListboxComponent default prop into slotProps.listbox.component
  const defaultPropsPathCollection = findComponentDefaultProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'Autocomplete',
  });

  defaultPropsPathCollection
    .find(j.ObjectProperty, { key: { name: 'ListboxComponent' } })
    .forEach((path) => {
      const removedValue = path.value.value;
      const defaultProps = path.parent.value;

      let hasSlotProps = false;
      defaultProps.properties.forEach((property) => {
        if (property.key?.name === 'slotProps') {
          hasSlotProps = true;
          const slotIndex = property.value.properties.findIndex(
            (prop) => prop?.key?.name === 'listbox',
          );
          if (slotIndex === -1) {
            property.value.properties.push(
              j.objectProperty(
                j.identifier('listbox'),
                j.objectExpression([j.objectProperty(j.identifier('component'), removedValue)]),
              ),
            );
          } else {
            const slotPropsSlotValue = property.value.properties.splice(slotIndex, 1)[0].value;
            property.value.properties.push(
              j.objectProperty(
                j.identifier('listbox'),
                j.objectExpression([
                  j.objectProperty(j.identifier('component'), removedValue),
                  j.spreadElement(slotPropsSlotValue),
                ]),
              ),
            );
          }
        }
      });

      if (!hasSlotProps) {
        defaultProps.properties.push(
          j.objectProperty(
            j.identifier('slotProps'),
            j.objectExpression([
              j.objectProperty(
                j.identifier('listbox'),
                j.objectExpression([j.objectProperty(j.identifier('component'), removedValue)]),
              ),
            ]),
          ),
        );
      }

      path.prune();
    });

  defaultPropsPathCollection
    .find(j.ObjectProperty, { key: { name: 'renderTags' } })
    .forEach((path) => {
      renameRenderTagsProp(j, path);
    });

  renameUseAutocompleteReturnMembers(j, root);

  return root.toSource(printOptions);
}
