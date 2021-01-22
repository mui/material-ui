import generateUtilityClass from '@material-ui/unstyled/generateUtilityClass';
import generateUtilityClasses from '@material-ui/unstyled/generateUtilityClasses';

export function getFilledInputUtilityClass(slot) {
  return generateUtilityClass('MuiFilledInput', slot);
}

const filledInputClasses = generateUtilityClasses('MuiInputBase', [
  'root',
  'formControl',
  'focused',
  'disabled',
  'adornedStart',
  'adornedEnd',
  'error',
  'marginDense',
  'multiline',
  'colorSecondary',
  'fullWidth',
  'input',
  'inputMarginDense',
  'inputMultiline',
  'inputTypeSearch',
  'inputAdornedStart',
  'inputAdornedEnd',
  'inputHiddenLabel',
]);

export default filledInputClasses;
