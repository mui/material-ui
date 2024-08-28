import findComponentJSX from '../../util/findComponentJSX';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const filterJSXAttr = (attr, name) => attr.type === 'JSXAttribute' && attr.name.name === name;

  findComponentJSX(j, { root, componentName: 'Grid' }, (gridElement) => {
    const attrs = gridElement.node.openingElement.attributes;
    const wrapPropIndex = attrs.findIndex((attr) => filterJSXAttr(attr, 'wrap'));

    if (wrapPropIndex !== -1) {
      if (attrs.findIndex((attr) => filterJSXAttr(attr, 'flexWrap')) !== -1) {
        attrs.splice(wrapPropIndex, 1);
      } else {
        attrs[wrapPropIndex].name.name = 'flexWrap';
      }
    }
  });

  root.find(j.ObjectProperty, { key: { name: 'MuiGrid' } }).forEach((path) => {
    const defaultProps = path.value.value.properties.find(({ key }) => key.name === 'defaultProps');
    const props = defaultProps.value.properties;
    const wrapPropIndex = props.findIndex((prop) => prop.key.name === 'wrap');

    if (wrapPropIndex !== -1) {
      if (props.findIndex((prop) => prop.key.name === 'flexWrap') !== -1) {
        props.splice(wrapPropIndex, 1);
      } else {
        props[wrapPropIndex].key.name = 'flexWrap';
      }
    }
  });

  return root.toSource(printOptions);
}
