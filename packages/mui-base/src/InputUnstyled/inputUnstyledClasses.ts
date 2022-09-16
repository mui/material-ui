import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface InputUnstyledClasses {
  /** Styles applied to the root element. */
  root: string;
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
  multiline: string;
  /** Styles applied to the input element. */
  input: string;
  /** Styles applied to the input element if `multiline={true}`. */
  inputMultiline: string;
  /** Styles applied to the input element if `type="search"`. */
  inputTypeSearch: string;
}

export type InputUnstyledClassKey = keyof InputUnstyledClasses;

export function getInputUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiInput', slot);
}

const inputUnstyledClasses: InputUnstyledClasses = generateUtilityClasses('MuiInput', [
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

export default inputUnstyledClasses;
