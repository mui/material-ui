import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';
import { inputBaseClasses } from '../InputBase';

export interface FilledInputClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if color secondary. */
  colorSecondary: string;
  /** Styles applied to the root element unless `disableUnderline={true}`. */
  underline: string;
  /** State class applied to the root element if the component is focused. */
  focused: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `startAdornment` is provided. */
  adornedStart: string;
  /** Styles applied to the root element if `endAdornment` is provided. */
  adornedEnd: string;
  /** State class applied to the root element if `error={true}`. */
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
  /** Styles applied to the input element if `type="search"`. */
  inputTypeSearch: string;
}

export type FilledInputClassKey = keyof FilledInputClasses;

export function getFilledInputUtilityClass(slot: string): string {
  return generateUtilityClass('MuiFilledInput', slot);
}

const filledInputClasses: FilledInputClasses = {
  ...inputBaseClasses,
  ...generateUtilityClasses('MuiFilledInput', ['root', 'underline', 'input']),
};

export default filledInputClasses;
