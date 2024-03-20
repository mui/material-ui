import findComponentJSX from '../../util/findComponentJSX';
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

  findComponentJSX(j, { root, componentName: 'Backdrop' }, (elementPath) => {
    const index = elementPath.node.openingElement.attributes.findIndex(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'TransitionComponent',
    );

    if (index !== -1) {
      const removed = elementPath.node.openingElement.attributes.splice(index, 1);
      let hasNode = false;
      elementPath.node.openingElement.attributes.forEach((attr) => {
        if (attr.name?.name === 'slots') {
          hasNode = true;
          assignObject(j, {
            target: attr,
            key: 'transition',
            expression: removed[0].value.expression,
          });
        }
      });

      if (!hasNode) {
        appendAttribute(j, {
          target: elementPath.node,
          attributeName: 'slots',
          expression: j.objectExpression([
            j.objectProperty(j.identifier('transition'), removed[0].value.expression),
          ]),
        });
      }
    }
  });

  root.find(j.ObjectProperty, { key: { name: 'TransitionComponent' } }).forEach((path) => {
    if (path.parent?.parent?.parent?.parent?.node.key?.name === 'MuiBackdrop') {
      const { properties: defaultPropsProperties } = path.parent.value;

      const existingSlots = defaultPropsProperties.find((prop) => prop.key.name === 'slots');
      const slots = existingSlots
        ? existingSlots.value.properties.reduce((acc, prop) => {
            return { ...acc, [prop.key.name]: prop.value };
          }, {})
        : {};

      const transitionComponent =
        defaultPropsProperties.find((prop) => prop.key.name === 'TransitionComponent') ?? {};

      const updatedSlots = j.objectExpression(
        Object.entries({
          transition: transitionComponent?.value,
          ...slots,
        }).map(([slot, value]) => {
          return j.objectProperty(j.identifier(slot), value);
        }),
      );

      if (existingSlots) {
        existingSlots.value = updatedSlots;
        path.prune();
      } else {
        path.replace(
          j.property(
            'init',
            j.identifier('slots'),
            j.objectExpression([j.objectProperty(j.identifier('transition'), path.node.value)]),
          ),
        );
      }
    }
  });

  return root.toSource(printOptions);
}
