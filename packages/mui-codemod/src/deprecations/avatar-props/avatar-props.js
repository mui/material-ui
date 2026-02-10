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

  findComponentJSX(j, { root, componentName: 'Avatar' }, (elementPath) => {
    const index = elementPath.node.openingElement.attributes.findIndex(
      (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'imgProps',
    );
    if (index !== -1) {
      const removed = elementPath.node.openingElement.attributes.splice(index, 1);
      let hasNode = false;
      elementPath.node.openingElement.attributes.forEach((attr) => {
        if (attr.name?.name === 'slotProps') {
          hasNode = true;
          assignObject(j, {
            target: attr,
            key: 'img',
            expression: removed[0].value.expression,
          });
        }
      });
      if (!hasNode) {
        appendAttribute(j, {
          target: elementPath.node,
          attributeName: 'slotProps',
          expression: j.objectExpression([
            j.objectProperty(j.identifier('img'), removed[0].value.expression),
          ]),
        });
      }
    }
  });

  root.find(j.ObjectProperty, { key: { name: 'imgProps' } }).forEach((path) => {
    if (path.parent?.parent?.parent?.parent?.node.key?.name === 'MuiAvatar') {
      path.replace(
        j.property(
          'init',
          j.identifier('slotProps'),
          j.objectExpression([j.objectProperty(j.identifier('img'), path.node.value)]),
        ),
      );
    }
  });

  return root.toSource(printOptions);
}
