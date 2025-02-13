import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface InputLabelClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `focused={true}`. */
  focused: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
  /** State class applied to the root element if `required={true}`. */
  required: string;
  /** State class applied to the asterisk element. */
  asterisk: string;
  /** Styles applied to the root element if the component is a descendant of `FormControl`. */
  formControl: string;
  /** Styles applied to the root element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the input element if `shrink={true}`. */
  shrink: string;
  /** Styles applied to the input element unless `disableAnimation={true}`. */
  animated: string;
  /** Styles applied to the root element if `variant="filled"`. */
  filled: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the root element if `variant="standard"`. */
  standard: string;
}

export type InputLabelClassKey = keyof InputLabelClasses;

export function getInputLabelUtilityClasses(slot: string): string {
  return generateUtilityClass('MuiInputLabel', slot);
}

const inputLabelClasses: InputLabelClasses = generateUtilityClasses('MuiInputLabel', [
  'root',
  'focused',
  'disabled',
  'error',
  'required',
  'asterisk',
  'formControl',
  'sizeSmall',
  'shrink',
  'animated',
  'standard',
  'filled',
  'outlined',
]);

export default inputLabelClasses;
