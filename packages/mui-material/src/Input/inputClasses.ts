import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import { inputBaseClasses } from '../InputBase';

export interface InputClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if the component is a descendant of `FormControl`.
   * @ignore
   */
  formControl: string;
  /** Styles applied to the root element if the component is focused. */
  focused: string;
  /** Styles applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if color secondary.
   * @ignore
   */
  colorSecondary: string;
  /** Styles applied to the root element unless `disableUnderline={true}`. */
  underline: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
  /** Styles applied to the input element if `size="small"`.
   * @ignore
   */
  sizeSmall: string;
  /** Styles applied to the root element if `multiline={true}`.
   * @ignore
   */
  multiline: string;
  /** Styles applied to the root element if `fullWidth={true}`.
   * @ignore
   */
  fullWidth: string;
  /** Styles applied to the input element. */
  input: string;
  /** Styles applied to the input element if `size="small"`.
   * @ignore
   */
  inputSizeSmall: string;
  /** Styles applied to the input element if `multiline={true}`.
   * @ignore
   */
  inputMultiline: string;
  /** Styles applied to the input element if `startAdornment` is provided.
   * @ignore
   */
  inputAdornedStart: string;
  /** Styles applied to the input element if `endAdornment` is provided.
   * @ignore
   */
  inputAdornedEnd: string;
  /** Styles applied to the input element if `type="search"`.
   * @ignore
   */
  inputTypeSearch: string;
}

export type InputClassKey = keyof InputClasses;

export function getInputUtilityClass(slot: string): string {
  return generateUtilityClass('MuiInput', slot);
}

const inputClasses: InputClasses = {
  ...inputBaseClasses,
  ...generateUtilityClasses('MuiInput', ['root', 'underline', 'input']),
};

export default inputClasses;
