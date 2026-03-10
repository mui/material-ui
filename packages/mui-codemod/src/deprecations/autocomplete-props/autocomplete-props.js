import movePropIntoSlots from '../utils/movePropIntoSlots';
import movePropIntoSlotProps from '../utils/movePropIntoSlotProps';
import replaceComponentsWithSlots from '../utils/replaceComponentsWithSlots';
import findComponentJSX from '../../util/findComponentJSX';
import findComponentDefaultProps from '../../util/findComponentDefaultProps';
import assignObject from '../../util/assignObject';
import appendAttribute from '../../util/appendAttribute';

function getImportedNames(j, root, packageName, componentName) {
  const importNames = new Set();

  root
    .find(j.ImportDeclaration)
    .filter((path) =>
      path.node.source.value.match(new RegExp(`^${packageName}(/${componentName})?$`)),
    )
    .forEach((path) => {
      path.node.specifiers.forEach((specifier) => {
        if (specifier.type === 'ImportDefaultSpecifier') {
          importNames.add(specifier.local.name);
        }
        if (specifier.type === 'ImportSpecifier' && specifier.imported.name === componentName) {
          importNames.add(specifier.local.name);
        }
      });
    });

  return importNames;
}

function getAttributeIndex(element, attributeName) {
  return element.openingElement.attributes.findIndex(
    (attr) => attr.type === 'JSXAttribute' && attr.name.name === attributeName,
  );
}

function upsertSlotPropsAttribute(j, element, callback) {
  const slotPropsIndex = getAttributeIndex(element, 'slotProps');

  if (slotPropsIndex === -1) {
    const slotPropsExpression = j.objectExpression([]);
    callback(slotPropsExpression);
    appendAttribute(j, {
      target: element,
      attributeName: 'slotProps',
      expression: slotPropsExpression,
    });
    return;
  }

  const slotPropsAttribute = element.openingElement.attributes[slotPropsIndex];
  const slotPropsExpression = slotPropsAttribute.value.expression;

  if (slotPropsExpression.type === 'ObjectExpression') {
    callback(slotPropsExpression);
    return;
  }

  const nextSlotPropsExpression = j.objectExpression([j.spreadElement(slotPropsExpression)]);
  callback(nextSlotPropsExpression);
  slotPropsAttribute.value.expression = nextSlotPropsExpression;
}

function moveJsxPropIntoSlotProps(j, element, propName, slotName) {
  const propIndex = getAttributeIndex(element, propName);

  if (propIndex === -1) {
    return;
  }

  const removedAttribute = element.openingElement.attributes.splice(propIndex, 1)[0];
  const removedValue =
    removedAttribute.value.type === 'StringLiteral'
      ? j.literal(removedAttribute.value.value)
      : removedAttribute.value.expression;

  upsertSlotPropsAttribute(j, element, (slotPropsExpression) => {
    const existingSlotIndex = slotPropsExpression.properties.findIndex(
      (property) => property.type !== 'SpreadElement' && property.key?.name === slotName,
    );

    if (existingSlotIndex === -1) {
      slotPropsExpression.properties.push(
        j.objectProperty(j.identifier(slotName), removedValue),
      );
      return;
    }

    const existingSlot = slotPropsExpression.properties[existingSlotIndex].value;
    slotPropsExpression.properties[existingSlotIndex].value = j.objectExpression([
      j.spreadElement(removedValue),
      j.spreadElement(existingSlot),
    ]);
  });
}

function ensureParamsSlotPropsSpread(j, element, paramsName) {
  const hasParamsSpread = element.openingElement.attributes.some(
    (attribute) =>
      attribute.type === 'JSXSpreadAttribute' &&
      attribute.argument.type === 'Identifier' &&
      attribute.argument.name === paramsName,
  );

  if (!hasParamsSpread) {
    return;
  }

  upsertSlotPropsAttribute(j, element, (slotPropsExpression) => {
    const hasSlotPropsSpread = slotPropsExpression.properties.some(
      (property) =>
        property.type === 'SpreadElement' &&
        property.argument.type === 'MemberExpression' &&
        property.argument.object.type === 'Identifier' &&
        property.argument.object.name === paramsName &&
        property.argument.property.type === 'Identifier' &&
        property.argument.property.name === 'slotProps',
    );

    if (!hasSlotPropsSpread) {
      slotPropsExpression.properties.unshift(
        j.spreadElement(
          j.memberExpression(j.identifier(paramsName), j.identifier('slotProps')),
        ),
      );
    }
  });
}

function replaceRenderInputParamsMembers(j, callbackRoot, paramsName) {
  const slotPropByDeprecatedName = {
    InputProps: 'input',
    inputProps: 'htmlInput',
    InputLabelProps: 'inputLabel',
  };

  callbackRoot
    .find(j.MemberExpression)
    .filter(
      (path) =>
        path.node.object.type === 'Identifier' &&
        path.node.object.name === paramsName &&
        path.node.property.type === 'Identifier' &&
        slotPropByDeprecatedName[path.node.property.name],
    )
    .replaceWith((path) =>
      j.memberExpression(
        j.memberExpression(j.identifier(paramsName), j.identifier('slotProps')),
        j.identifier(slotPropByDeprecatedName[path.node.property.name]),
      ),
    );
}

function transformRenderInput(j, root, options) {
  const packageName = options.packageName || '@mui/material';
  const textFieldNames = getImportedNames(j, root, packageName, 'TextField');

  findComponentJSX(
    j,
    { root, packageName: options.packageName, componentName: 'Autocomplete' },
    (elementPath) => {
      const renderInputIndex = getAttributeIndex(elementPath.node, 'renderInput');

      if (renderInputIndex === -1) {
        return;
      }

      const renderInputAttribute = elementPath.node.openingElement.attributes[renderInputIndex];
      const renderInputExpression = renderInputAttribute.value?.expression;

      if (
        !renderInputExpression ||
        !['ArrowFunctionExpression', 'FunctionExpression'].includes(renderInputExpression.type) ||
        renderInputExpression.params.length === 0 ||
        renderInputExpression.params[0].type !== 'Identifier'
      ) {
        return;
      }

      const paramsName = renderInputExpression.params[0].name;
      const callbackRoot = j(renderInputExpression.body);

      replaceRenderInputParamsMembers(j, callbackRoot, paramsName);

      textFieldNames.forEach((textFieldName) => {
        callbackRoot
          .find(j.JSXElement)
          .filter(
            (textFieldPath) =>
              textFieldPath.node.openingElement.name.type === 'JSXIdentifier' &&
              textFieldPath.node.openingElement.name.name === textFieldName,
          )
          .forEach((textFieldPath) => {
            const element = textFieldPath.node;

            moveJsxPropIntoSlotProps(j, element, 'InputProps', 'input');
            moveJsxPropIntoSlotProps(j, element, 'inputProps', 'htmlInput');
            moveJsxPropIntoSlotProps(j, element, 'InputLabelProps', 'inputLabel');
            moveJsxPropIntoSlotProps(j, element, 'SelectProps', 'select');
            moveJsxPropIntoSlotProps(j, element, 'FormHelperTextProps', 'formHelperText');

            if (getAttributeIndex(element, 'slotProps') !== -1) {
              ensureParamsSlotPropsSpread(j, element, paramsName);
            }
          });
      });
    },
  );
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

  transformRenderInput(j, root, options);

  // Move ListboxComponent JSX prop into slotProps.listbox.component
  findComponentJSX(
    j,
    { root, packageName: options.packageName, componentName: 'Autocomplete' },
    (elementPath) => {
      const element = elementPath.node;
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

  return root.toSource(printOptions);
}
