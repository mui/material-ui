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
    componentName: 'TextField',
    propName: 'InputProps',
    slotName: 'input',
  });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'TextField',
    propName: 'inputProps',
    slotName: 'htmlInput',
  });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'TextField',
    propName: 'SelectProps',
    slotName: 'select',
  });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'TextField',
    propName: 'InputLabelProps',
    slotName: 'inputLabel',
  });

  movePropIntoSlotProps(j, {
    root,
    componentName: 'TextField',
    propName: 'FormHelperTextProps',
    slotName: 'formHelperText',
  });

  return root.toSource(printOptions);
}
