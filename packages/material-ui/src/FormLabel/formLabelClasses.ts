import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface FormLabelClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if the color is secondary. */
  colorSecondary: string;
  /** Pseudo-class applied to the root element if `focused={true}`. */
  focused: string;
  /** Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Pseudo-class applied to the root element if `error={true}`. */
  error: string;
  /** Pseudo-class applied to the root element if `filled={true}`. */
  filled: string;
  /** Pseudo-class applied to the root element if `required={true}`. */
  required: string;
  /** Styles applied to the asterisk element. */
  asterisk: string;
}

export type FormLabelClassKey = keyof FormLabelClasses;

export function getFormLabelUtilityClasses(slot: string): string {
  return generateUtilityClass('MuiFormLabel', slot);
}

const formLabelClasses: FormLabelClasses = generateUtilityClasses('MuiFormLabel', [
  'root',
  'colorSecondary',
  'focused',
  'disabled',
  'error',
  'filled',
  'required',
  'asterisk',
]);

export default formLabelClasses;
