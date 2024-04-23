import findComponentJSX from '../../util/findComponentJSX';
import findComponentDefaultProps from '../../util/findComponentDefaultProps';
import assignObject from '../../util/assignObject';
import appendAttribute from '../../util/appendAttribute';

function moveJsxPropIntoSlots(j, element, propName, slotName) {
  const index = element.openingElement.attributes.findIndex(
    (attr) => attr.type === 'JSXAttribute' && attr.name.name === propName,
  );

  if (index !== -1) {
    const removedValue = element.openingElement.attributes.splice(index, 1)[0].value.expression;
    let hasSlots = false;
    element.openingElement.attributes.forEach((attr) => {
      if (attr.name?.name === 'slots') {
        hasSlots = true;
        const slotIndex = attr.value.expression.properties.findIndex(
          (prop) => prop?.key?.name === slotName,
        );
        if (slotIndex === -1) {
          assignObject(j, {
            target: attr,
            key: slotName,
            expression: removedValue,
          });
        }
      }
    });

    if (!hasSlots) {
      appendAttribute(j, {
        target: element,
        attributeName: 'slots',
        expression: j.objectExpression([j.objectProperty(j.identifier(slotName), removedValue)]),
      });
    }
  }
}

function moveDefaultPropsPropIntoSlots(j, defaultPropsPathCollection, propName, slotName) {
  defaultPropsPathCollection.find(j.ObjectProperty, { key: { name: propName } }).forEach((path) => {
    const removedValue = path.value.value;
    const defaultProps = path.parent.value;

    let hasSlots = false;
    defaultProps.properties.forEach((property) => {
      if (property.key?.name === 'slots') {
        hasSlots = true;
        const slots = property.value;
        const slotIndex = slots.properties.findIndex((prop) => prop?.key?.name === slotName);
        if (slotIndex === -1) {
          slots.properties.push(j.objectProperty(j.identifier(slotName), removedValue));
        }
      }
    });

    if (!hasSlots) {
      defaultProps.properties.push(
        j.property(
          'init',
          j.identifier('slots'),
          j.objectExpression([j.objectProperty(j.identifier(slotName), removedValue)]),
        ),
      );
    }

    path.prune();
  });
}

/**
 * Moves prop into slots.
 * If the slots prop exists, it will add the prop to the slots.
 * If there are duplicated values, the slots values will be used.
 *
 * @param {import('jscodeshift')} j
 * @param {{ root: import('jscodeshift').Collection; componentName: string, propName: string, slotName: string }} options
 *
 * @example <Component TransitionComponent={CustomTransition} /> => <Component slots={{ transition: CustomTransition }} />
 */
export default function movePropIntoSlots(j, options) {
  const { root, componentName, propName, slotName } = options;

  findComponentJSX(j, { root, componentName }, (elementPath) => {
    moveJsxPropIntoSlots(j, elementPath.node, propName, slotName);
  });

  const defaultPropsPathCollection = findComponentDefaultProps(j, { root, componentName });

  moveDefaultPropsPropIntoSlots(j, defaultPropsPathCollection, propName, slotName);
}
