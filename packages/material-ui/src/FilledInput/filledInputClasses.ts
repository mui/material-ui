import { generateUtilityClasses, generateUtilityClass } from '@material-ui/unstyled';

export interface FilledInputClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if color secondary. */
  colorSecondary: string;
  /** Styles applied to the root element unless `disableUnderline={true}`. */
  underline: string;
  /** Pseudo-class applied to the root element if the component is focused. */
  focused: string;
  /** Pseudo-class applied to the root element if `disabled={true}`. */
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
  /** Styles applied to the root element if `hiddenLabel={true}`. */
  hiddenLabel: string;
  /** Styles applied to the input element. */
  input: string;
  /** Styles applied to the input element if `size="small"`. */
  inputSizeSmall: string;
  /** Styles applied to the `input` if in `<FormControl hiddenLabel />`. */
  inputHiddenLabel: string;
  /** Styles applied to the input element if `multiline={true}`. */
  inputMultiline: string;
  /** Styles applied to the input element if `startAdornment` is provided. */
  inputAdornedStart: string;
  /** Styles applied to the input element if `endAdornment` is provided. */
  inputAdornedEnd: string;
}

export type FilledInputClassKey = keyof FilledInputClasses;

export function getFilledInputUtilityClass(slot: string): string {
  return generateUtilityClass('MuiFilledInput', slot);
}

const filledInputClasses: FilledInputClasses = generateUtilityClasses('MuiFilledInput', [
  'root',
  'colorSecondary',
  'underline',
  'focused',
  'disabled',
  'adornedStart',
  'adornedEnd',
  'error',
  'sizeSmall',
  'multiline',
  'hiddenLabel',
  'input',
  'inputSizeSmall',
  'inputHiddenLabel',
  'inputMultiline',
  'inputAdornedStart',
  'inputAdornedEnd',
]);

export default filledInputClasses;
