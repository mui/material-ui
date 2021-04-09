import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getInputAdornmentUtilityClass(slot) {
  return generateUtilityClass('MuiInputAdornment', slot);
}

const inputAdornmentClasses = generateUtilityClasses('MuiInputAdornment', [
  'root',
  'filled',
  'positionStart',
  'positionEnd',
  'disablePointerEvents',
  'hiddenLabel',
  'sizeSmall',
]);

export default inputAdornmentClasses;
