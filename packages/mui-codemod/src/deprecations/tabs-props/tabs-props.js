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

  movePropIntoSlots(j, {
    root,
    componentName: 'Tabs',
    propName: 'ScrollButtonComponent',
    slotName: 'scrollButton',
  });
  movePropIntoSlotProps(j, {
    root,
    componentName: 'Tabs',
    propName: 'TabScrollButtonProps',
    slotName: 'scrollButton',
  });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'Tabs',
    propName: 'TabIndicatorProps',
    slotName: 'indicator',
  });

  return root.toSource(printOptions);
}
