import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface InputClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the input element. */
  input: string;
  /** Styles applied to the root element if the component is a descendant of `FormControl`. */
  formControl: string;
  /** Styles applied to the root element if `startAdornment` is provided. */
  adornedStart: string;
  /** Styles applied to the root element if `endAdornment` is provided. */
  adornedEnd: string;
  /** Styles applied to the root element if the component is focused. */
  focused: string;
  /** Styles applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
  /** Styles applied to the root element if `multiline={true}`. */
}

export type InputClassKey = keyof InputClasses;

export function getInputUtilityClass(slot: string): string {
  return generateUtilityClass('JoyInput', slot);
}

const inputClasses: InputClasses = generateUtilityClasses('JoyInput', [
  'root',
  'input',
  'formControl',
  'focused',
  'disabled',
  'error',
  'adornedStart',
  'adornedEnd',
]);

export default inputClasses;
