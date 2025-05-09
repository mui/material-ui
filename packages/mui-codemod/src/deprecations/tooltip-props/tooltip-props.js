import replaceComponentsWithSlots from '../utils/replaceComponentsWithSlots';
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

  replaceComponentsWithSlots(j, { root, componentName: 'Tooltip' });

  movePropIntoSlots(j, {
    root,
    componentName: 'Tooltip',
    propName: 'PopperComponent',
    slotName: 'popper',
  });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'Tooltip',
    propName: 'PopperProps',
    slotName: 'popper',
  });

  movePropIntoSlots(j, {
    root,
    componentName: 'Tooltip',
    propName: 'TransitionComponent',
    slotName: 'transition',
  });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'Tooltip',
    propName: 'TransitionProps',
    slotName: 'transition',
  });

  return root.toSource(printOptions);
}
