import replaceComponentsWithSlots from '../utils/replaceComponentsWithSlots';
import movePropIntoSlots from '../utils/movePropIntoSlots';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  replaceComponentsWithSlots(j, { root, componentName: 'TableSortLabel' });

  movePropIntoSlots(j, {
    root,
    componentName: 'TableSortLabel',
    propName: 'IconComponent',
    slotName: 'icon',
  });

  return root.toSource(printOptions);
}
