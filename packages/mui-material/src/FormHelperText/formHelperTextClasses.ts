import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface FormHelperTextClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `variant="filled"` or `variant="outlined"`. */
  contained: string;
  /** State class applied to the root element if `focused={true}`. */
  focused: string;
  /** State class applied to the root element if `filled={true}`. */
  filled: string;
  /** State class applied to the root element if `required={true}`. */
  required: string;
}

export type FormHelperTextClassKey = keyof FormHelperTextClasses;

export function getFormHelperTextUtilityClasses(slot: string): string {
  return generateUtilityClass('MuiFormHelperText', slot);
}

const formHelperTextClasses: FormHelperTextClasses = generateUtilityClasses('MuiFormHelperText', [
  'root',
  'error',
  'disabled',
  'sizeSmall',
  'sizeMedium',
  'contained',
  'focused',
  'filled',
  'required',
]);

export default formHelperTextClasses;
