import generateUtilityClass from '@material-ui/unstyled/generateUtilityClass';
import generateUtilityClasses from '@material-ui/unstyled/generateUtilityClasses';

export function getInputBaseUtilityClass(slot) {
  return generateUtilityClass('MuiFilledInput', slot);
}

const inputBaseClasses = generateUtilityClasses('MuiFilledInput', [
  'root',
  'colorSecondary',
  'underline',
  'focused',
  'disabled',
  'adornedStart',
  'adornedEnd',
  'error',
  'marginDense',
  'multiline',
  'input',
  'inputMarginDense',
  'inputHiddenLabel',
  'inputMultiline',
  'inputAdornedStart',
  'inputAdornedEnd',
]);

export default inputBaseClasses;
