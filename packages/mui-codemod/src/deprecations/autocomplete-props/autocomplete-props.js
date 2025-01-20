import movePropIntoSlots from '../utils/movePropIntoSlots';
import movePropIntoSlotProps from '../utils/movePropIntoSlotProps';
import replaceComponentsWithSlots from '../utils/replaceComponentsWithSlots';
import findComponentJSX from '../../util/findComponentJSX';
import findComponentDefaultProps from '../../util/findComponentDefaultProps';
import assignObject from '../../util/assignObject';
import appendAttribute from '../../util/appendAttribute';

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
    componentName: 'Autocomplete',
    propName: 'PaperComponent',
    slotName: 'paper',
  });

  movePropIntoSlots(j, {
    root,
    componentName: 'Autocomplete',
    propName: 'PopperComponent',
    slotName: 'popper',
  });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'Autocomplete',
    propName: 'ListboxProps',
    slotName: 'listbox',
  });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'Autocomplete',
    propName: 'ChipProps',
    slotName: 'chip',
  });

  replaceComponentsWithSlots(j, { root, componentName: 'Autocomplete' });

  // Move ListboxComponent JSX prop into slotProps.listbox.component
  findComponentJSX(j, { root, componentName: 'Autocomplete' }, (elementPath) => {
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
  });

  // Move ListboxComponent default prop into slotProps.listbox.component
  const defaultPropsPathCollection = findComponentDefaultProps(j, {
    root,
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
