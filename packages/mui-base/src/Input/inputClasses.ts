import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';

const COMPONENT_NAME = 'Input';

export interface InputClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if the component is a descendant of `FormControl`. */
  formControl: string;
  /** Class name applied to the root element if `startAdornment` is provided. */
  adornedStart: string;
  /** Class name applied to the root element if `endAdornment` is provided. */
  adornedEnd: string;
  /** State class applied to the root element if the component is focused. */
  focused: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
  /** Class name applied to the root element if `multiline={true}`. */
  multiline: string;
  /** Class name applied to the input element. */
  input: string;
  /** Class name applied to the input element if `multiline={true}`. */
  inputMultiline: string;
  /** Class name applied to the input element if `type="search"`. */
  inputTypeSearch: string;
}

export type InputClassKey = keyof InputClasses;

export function getInputUtilityClass(slot: string): string {
  return generateUtilityClass(COMPONENT_NAME, slot);
}

export const inputClasses: InputClasses = generateUtilityClasses(COMPONENT_NAME, [
  'root',
  'formControl',
  'focused',
  'disabled',
  'error',
  'multiline',
  'input',
  'inputMultiline',
  'inputTypeSearch',
  'adornedStart',
  'adornedEnd',
]);
