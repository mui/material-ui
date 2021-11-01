import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

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

export const getFormHelperTextClasses = (): FormHelperTextClasses =>
  generateUtilityClasses('MuiFormHelperText', [
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

const formHelperTextClasses = getFormHelperTextClasses();

export default formHelperTextClasses;
