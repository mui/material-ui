import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import { inputBaseClasses } from '../InputBase';

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
  /** State class applied to the root element if `error={true}`. */
  error: string;
  /** Styles applied to the input element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `multiline={true}`. */
  multiline: string;
  /** Styles applied to the NotchedOutline element. */
  notchedOutline: string;
  /** Styles applied to the input element. */
  input: string;
  /** Styles applied to the input element if `type="search"`. */
  inputTypeSearch: string;
  /** State class applied to the input element if it is an empty date/time input (`type="date"`, `"datetime-local"`, `"month"`, `"time"`, or `"week"`). */
  inputEmptyDateLike: string;
}

export type OutlinedInputClassKey = keyof OutlinedInputClasses;

export function getOutlinedInputUtilityClass(slot: string): string {
  return generateUtilityClass('MuiOutlinedInput', slot);
}

const outlinedInputClasses: OutlinedInputClasses = {
  ...inputBaseClasses,
  ...generateUtilityClasses('MuiOutlinedInput', ['root', 'notchedOutline', 'input']),
};

export default outlinedInputClasses;
