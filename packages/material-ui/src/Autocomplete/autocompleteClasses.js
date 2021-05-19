import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getAutocompleteUtilityClass(slot) {
  return generateUtilityClass('MuiAutocomplete', slot);
}

const autocompleteClasses = generateUtilityClasses('MuiAutocomplete', [
  'root',
  'fullWidth',
  'focused',
  'focusVisible',
  'tag',
  'tagSizeSmall',
  'tagSizeMedium',
  'hasPopupIcon',
  'hasClearIcon',
  'inputRoot',
  'input',
  'inputFocused',
  'endAdornment',
  'clearIndicator',
  'popupIndicator',
  'popupIndicatorOpen',
  'popper',
  'popperDisablePortal',
  'paper',
  'listbox',
  'loading',
  'noOptions',
  'option',
  'groupLabel',
  'groupUl',
]);

export default autocompleteClasses;
