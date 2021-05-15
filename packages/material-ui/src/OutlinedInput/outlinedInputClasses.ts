import { generateUtilityClasses, generateUtilityClass } from '@material-ui/unstyled';

export interface OutlinedInputClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if the color is secondary. */
  colorSecondary: string;
  /** Styles applied to the root element if the component is focused. */
  focused: string;
  /** Styles applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `startAdornment` is provided. */
  adornedStart: string;
  /** Styles applied to the root element if `endAdornment` is provided. */
  adornedEnd: string;
  /** Pseudo-class applied to the root element if `error={true}`. */
  error: string;
  /** Styles applied to the input element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `multiline={true}`. */
  multiline: string;
  /** Styles applied to the NotchedOutline element. */
  notchedOutline: string;
  /** Styles applied to the input element. */
  input: string;
  /** Styles applied to the input element if `size="small"`. */
  inputSizeSmall: string;
  /** Styles applied to the input element if `multiline={true}`. */
  inputMultiline: string;
  /** Styles applied to the input element if `startAdornment` is provided. */
  inputAdornedStart: string;
  /** Styles applied to the input element if `endAdornment` is provided. */
  inputAdornedEnd: string;
}

export type OutlinedInputClassKey = keyof OutlinedInputClasses;

export function getOutlinedInputUtilityClass(slot: string): string {
  return generateUtilityClass('MuiOutlinedInput', slot);
}

const outlinedInputClasses: OutlinedInputClasses = generateUtilityClasses('MuiOutlinedInput', [
  'root',
  'colorSecondary',
  'focused',
  'disabled',
  'adornedStart',
  'adornedEnd',
  'error',
  'sizeSmall',
  'multiline',
  'notchedOutline',
  'input',
  'inputSizeSmall',
  'inputMultiline',
  'inputAdornedStart',
  'inputAdornedEnd',
]);

export default outlinedInputClasses;
