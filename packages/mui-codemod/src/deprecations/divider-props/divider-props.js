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

  root.find(j.ObjectProperty, { key: { name: 'MuiDivider' } }).forEach((path) => {
    const defaultPropsObject = path.value.value.properties.find(
      (key) => key.key.name === 'defaultProps',
    );

    defaultPropsObject.value.properties = defaultPropsObject.value.properties.filter(
      (prop) => !['light'].includes(prop?.key?.name),
    );
  });

  return root.toSource(printOptions);
}
