import replaceComponentsWithSlots from '../utils/replaceComponentsWithSlots';
import movePropIntoSlotProps from '../utils/movePropIntoSlotProps';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  replaceComponentsWithSlots(j, { root, componentName: 'ListItemText' });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'ListItemText',
    propName: 'primaryTypographyProps',
    slotName: 'primary',
  });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'ListItemText',
    propName: 'secondaryTypographyProps',
    slotName: 'secondary',
  });

  return root.toSource(printOptions);
}
