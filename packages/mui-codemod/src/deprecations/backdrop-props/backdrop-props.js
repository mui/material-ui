import movePropIntoSlots from '../utils/movePropIntoSlots';
import replaceComponentsWithSlots from '../utils/replaceComponentsWithSlots';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  replaceComponentsWithSlots(j, {
    root,
    packageName: options.packageName,
    componentName: 'Backdrop',
  });

  movePropIntoSlots(j, {
    root,
    packageName: options.packageName,
    componentName: 'Backdrop',
    propName: 'TransitionComponent',
    slotName: 'transition',
  });

  return root.toSource(printOptions);
}
