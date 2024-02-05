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
    elementPath.node.openingElement.attributes = elementPath.node.openingElement.attributes.filter(
      (attr) => {
        if (attr.type === 'JSXAttribute' && attr.name.name === 'light') {
          return false;
        }
        return true;
      },
    );
  });

  return root.toSource(printOptions);
}
