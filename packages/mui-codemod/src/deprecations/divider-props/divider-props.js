import appendAttribute from '../../util/appendAttribute';
import assignObject from '../../util/assignObject';
import findComponentJSX from '../../util/findComponentJSX';

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

  root.find(j.ObjectProperty, { key: { name: 'MuiDivider' } }).forEach((path) => {
    const defaultPropsObject = path.value.value.properties.find(
      (key) => key.key.name === 'defaultProps',
    );

    const lightProp = defaultPropsObject.value.properties.find((prop) => prop.key.name === 'light');

    if (!lightProp) {
      return;
    }

    defaultPropsObject.value.properties = defaultPropsObject.value.properties.filter(
      (prop) => !['light'].includes(prop?.key?.name),
    );

    const isLightPropTruthy = lightProp.value?.value !== false;

    if (!isLightPropTruthy) {
      return;
    }

    const sxIndex = defaultPropsObject.value.properties.findIndex((prop) => prop.key.name === 'sx');

    if (sxIndex === -1) {
      defaultPropsObject.value.properties.push(
        j.objectProperty(
          j.identifier('sx'),
          j.objectExpression([j.objectProperty(j.identifier('opacity'), j.literal('0.6'))]),
        ),
      );
    } else {
      const opacityIndex = defaultPropsObject.value.properties[sxIndex].value.properties.findIndex(
        (key) => key.key.name === 'opacity',
      );

      if (opacityIndex === -1) {
        defaultPropsObject.value.properties[sxIndex].value.properties.push(
          j.objectProperty(j.identifier('opacity'), j.literal('0.6')),
        );
      }
    }
  });

  return root.toSource(printOptions);
}
