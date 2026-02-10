import findComponentJSX from '../../util/findComponentJSX';
import findComponentDefaultProps from '../../util/findComponentDefaultProps';
import assignObject from '../../util/assignObject';
import appendAttribute from '../../util/appendAttribute';

function componentsKeyToSlotsKey(str) {
  return str[0].toLowerCase() + str.slice(1);
}

function replaceJsxComponentsProp(j, elementPath) {
  const element = elementPath.node;
  const index = element.openingElement.attributes.findIndex(
    (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'components',
  );
  if (index !== -1) {
    const removed = element.openingElement.attributes.splice(index, 1);
    const camelCaseComponents = removed[0].value.expression.properties.reduce((acc, prop) => {
      return { ...acc, [componentsKeyToSlotsKey(prop.key.name)]: prop.value };
    }, {});
    let hasNode = false;
    element.openingElement.attributes.forEach((attr) => {
      if (attr.name?.name === 'slots') {
        hasNode = true;
        const slots = attr.value.expression.properties.reduce((acc, prop) => {
          return { ...acc, [prop.key.name]: prop.value };
        }, {});
        Object.entries(camelCaseComponents).forEach(([slot, value]) => {
          if (!slots[slot]) {
            assignObject(j, {
              target: attr,
              key: slot,
              expression: value,
            });
          }
        });
      }
    });
    if (!hasNode) {
      appendAttribute(j, {
        target: element,
        attributeName: 'slots',
        expression: j.objectExpression(
          Object.entries(camelCaseComponents).map(([slot, value]) => {
            return j.objectProperty(j.identifier(slot), value);
          }),
        ),
      });
    }
  }
}

function replaceJsxComponentsPropsProp(j, element) {
  const index = element.openingElement.attributes.findIndex(
    (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'componentsProps',
  );
  if (index !== -1) {
    const removed = element.openingElement.attributes.splice(index, 1);
    let hasNode = false;
    element.openingElement.attributes.forEach((attr) => {
      if (attr.name?.name === 'slotProps') {
        hasNode = true;
        const slotProps = attr.value.expression.properties.reduce((acc, prop) => {
          return { ...acc, [prop.key.name]: prop.value };
        }, {});
        removed[0].value.expression.properties.forEach((prop) => {
          if (!slotProps[prop.key.name]) {
            assignObject(j, {
              target: attr,
              key: prop.key.name,
              expression: prop.value,
            });
          } else {
            attr.value.expression.properties = attr.value.expression.properties.filter(
              (p) => p?.key?.name !== prop.key.name,
            );

            assignObject(j, {
              target: attr,
              key: prop.key.name,
              expression: j.objectExpression([
                j.spreadElement(prop.value),
                j.spreadElement(slotProps[prop.key.name]),
              ]),
            });
          }
        });
      }
    });
    if (!hasNode) {
      appendAttribute(j, {
        target: element,
        attributeName: 'slotProps',
        expression: removed[0].value.expression,
      });
    }
  }
}

function replaceDefaultPropsComponentsProp(j, defaultPropsPathCollection) {
  defaultPropsPathCollection
    .find(j.ObjectProperty, { key: { name: 'components' } })
    .forEach((path) => {
      const { properties: defaultPropsProperties } = path.parent.value;

      const components = path.value.value.properties.reduce((acc, prop) => {
        return { ...acc, [componentsKeyToSlotsKey(prop.key.name)]: prop.value };
      }, {});

      const existingSlots = defaultPropsProperties.find((prop) => prop.key.name === 'slots');

      const slots = existingSlots
        ? existingSlots.value.properties.reduce((acc, prop) => {
            return { ...acc, [prop.key.name]: prop.value };
          }, {})
        : {};

      const updatedSlots = j.objectExpression(
        Object.entries({ ...components, ...slots }).map(([slot, value]) => {
          return j.objectProperty(j.identifier(slot), value);
        }),
      );

      if (existingSlots) {
        existingSlots.value = updatedSlots;
      } else {
        defaultPropsProperties.push(j.property('init', j.identifier('slots'), updatedSlots));
      }

      path.prune();
    });
}

function replaceDefaultPropsComponentsPropsProp(j, defaultPropsPathCollection) {
  defaultPropsPathCollection
    .find(j.ObjectProperty, { key: { name: 'componentsProps' } })
    .forEach((path) => {
      const { properties: defaultPropsProperties } = path.parent.value;

      const components = path.value.value.properties.reduce((acc, prop) => {
        return { ...acc, [prop.key.name]: prop.value };
      }, {});

      const existingSlots = defaultPropsProperties.find((prop) => prop.key.name === 'slotProps');

      const slots = existingSlots
        ? existingSlots.value.properties.reduce((acc, prop) => {
            return {
              ...acc,
              [prop.key.name]: components[prop.key.name]
                ? j.objectExpression([
                    j.spreadElement(components[prop.key.name]),
                    j.spreadElement(prop.value),
                  ])
                : prop.value,
            };
          }, {})
        : {};

      const updatedSlots = j.objectExpression(
        Object.entries({ ...components, ...slots }).map(([slot, value]) => {
          return j.objectProperty(j.identifier(slot), value);
        }),
      );

      if (existingSlots) {
        existingSlots.value = updatedSlots;
      } else {
        defaultPropsProperties.push(j.property('init', j.identifier('slotProps'), updatedSlots));
      }

      path.prune();
    });
}

/**
 * Replaces components and componentsProps props with slots and slotProps.
 * Handles local object and variable declaration.
 * If the slots prop exists, it will add the components to the slots.
 * If there are duplicated values, the slots values will be used.
 *
 * @param {import('jscodeshift')} j
 * @param {{ element: import('jscodeshift').JSXElement }} options
 *
 * @example <Component componentsProps={{ root: { 'testid': 'root-id'} }} /> => <Component slotProps={{ root: { 'testid': 'root-id'} }} />
 */
export default function replaceComponentsWithSlots(j, options) {
  const { root, componentName } = options;

  findComponentJSX(j, { root, componentName }, (elementPath) => {
    replaceJsxComponentsProp(j, elementPath);
    replaceJsxComponentsPropsProp(j, elementPath.node);
  });

  const defaultPropsPathCollection = findComponentDefaultProps(j, { root, componentName });

  replaceDefaultPropsComponentsProp(j, defaultPropsPathCollection);
  replaceDefaultPropsComponentsPropsProp(j, defaultPropsPathCollection);
}
