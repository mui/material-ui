import movePropIntoSlots from '../utils/movePropIntoSlots';
import movePropIntoSlotProps from '../utils/movePropIntoSlotProps';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'Menu',
    propName: 'MenuListProps',
    slotName: 'list',
  });

  movePropIntoSlots(j, {
    root,
    packageName: options.packageName,
    componentName: 'Menu',
    propName: 'TransitionComponent',
    slotName: 'transition',
  });

  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'Menu',
    propName: 'TransitionProps',
    slotName: 'transition',
  });

  return root.toSource(printOptions);
}
