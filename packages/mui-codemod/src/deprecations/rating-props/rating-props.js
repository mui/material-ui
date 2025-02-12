import movePropIntoSlots from '../utils/movePropIntoSlots';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  movePropIntoSlots(j, {
    root,
    componentName: 'Rating',
    propName: 'IconContainerComponent',
    slotName: 'iconContainer',
  });

  return root.toSource(printOptions);
}
