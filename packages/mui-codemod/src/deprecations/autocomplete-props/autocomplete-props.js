import movePropIntoSlots from '../utils/movePropIntoSlots';
import movePropIntoSlotProps from '../utils/movePropIntoSlotProps';
import replaceComponentsWithSlots from '../utils/replaceComponentsWithSlots';

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
    componentName: 'Autocomplete',
    propName: 'PaperComponent',
    slotName: 'paper',
  });

  movePropIntoSlots(j, {
    root,
    componentName: 'Autocomplete',
    propName: 'PopperComponent',
    slotName: 'popper',
  });

  movePropIntoSlots(j, {
    root,
    componentName: 'Autocomplete',
    propName: 'ListboxComponent',
    slotName: 'listbox',
  });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'Autocomplete',
    propName: 'ListboxProps',
    slotName: 'listbox',
  });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'Autocomplete',
    propName: 'ChipProps',
    slotName: 'chip',
  });

  replaceComponentsWithSlots(j, { root, componentName: 'Autocomplete' });

  return root.toSource(printOptions);
}
