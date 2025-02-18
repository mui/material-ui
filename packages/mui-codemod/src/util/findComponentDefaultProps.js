/**
 * Find all the default props path of a given component name.
 *
 * @param {import('jscodeshift')} j
 * @param {{ root: import('jscodeshift').Collection; componentName: string }} options
 * @returns {import('jscodeshift').Collection}
 *
 */
export default function findComponentDefaultProps(j, options) {
  const { root, componentName } = options;

  const defaultPropsPathCollection = root
    .find(j.ObjectProperty, { key: { name: `Mui${componentName}` } })
    .find(j.ObjectProperty, { key: { name: 'defaultProps' } });

  return defaultPropsPathCollection;
}
