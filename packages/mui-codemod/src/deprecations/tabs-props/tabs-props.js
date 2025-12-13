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
    packageName: options.packageName,
    componentName: 'Tabs',
    propName: 'ScrollButtonComponent',
    slotName: 'scrollButtons',
  });
  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'Tabs',
    propName: 'TabScrollButtonProps',
    slotName: 'scrollButtons',
  });

  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'Tabs',
    propName: 'TabIndicatorProps',
    slotName: 'indicator',
  });

  return root.toSource(printOptions);
}
