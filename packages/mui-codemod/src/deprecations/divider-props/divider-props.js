import appendAttribute from '../../util/appendAttribute';
import assignObject from '../../util/assignObject';
import findComponentJSX from '../../util/findComponentJSX';
import findComponentDefaultProps from '../../util/findComponentDefaultProps';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  findComponentJSX(j, { root, componentName: 'Divider' }, (elementPath) => {
    const lightProp = elementPath.node.openingElement.attributes.find(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'light',
    );

    if (!lightProp) {
      return;
    }

    elementPath.node.openingElement.attributes = elementPath.node.openingElement.attributes.filter(
      (attr) => {
        if (attr.type === 'JSXAttribute' && attr.name.name === 'light') {
          return false;
        }
        return true;
      },
    );

    const isLightPropTruthy = lightProp.value?.expression.value !== false;

    if (!isLightPropTruthy) {
      return;
    }

    const sxIndex = elementPath.node.openingElement.attributes.findIndex(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'sx',
    );
    if (sxIndex === -1) {
      appendAttribute(j, {
        target: elementPath.node,
        attributeName: 'sx',
        expression: j.objectExpression([
          j.objectProperty(j.identifier('opacity'), j.literal('0.6')),
        ]),
      });
    } else {
      const opacityIndex = elementPath.node.openingElement.attributes[
        sxIndex
      ].value.expression.properties.findIndex((key) => key.key.name === 'opacity');

      if (opacityIndex === -1) {
        assignObject(j, {
          target: elementPath.node.openingElement.attributes[sxIndex],
          key: 'opacity',
          expression: j.literal('0.6'),
        });
      }
    }
  });

  const defaultPropsPathCollection = findComponentDefaultProps(j, {
    root,
    componentName: 'Divider',
  });

  defaultPropsPathCollection.find(j.ObjectProperty, { key: { name: 'light' } }).forEach((path) => {
    const { properties: defaultPropsProperties } = path.parent.value;

    if (path.value?.value.value === false) {
      path.prune();
      return;
    }

    const existingSx = defaultPropsProperties.find((prop) => prop.key.name === 'sx');

    if (!existingSx) {
      defaultPropsProperties.push(
        j.property(
          'init',
          j.identifier('sx'),
          j.objectExpression([j.objectProperty(j.identifier('opacity'), j.literal('0.6'))]),
        ),
      );
    } else if (!existingSx.value.properties.find((prop) => prop.key.name === 'opacity')) {
      existingSx.value.properties.push(
        j.property('init', j.identifier('opacity'), j.literal('0.6')),
      );
    }

    path.prune();
  });

  return root.toSource(printOptions);
}
