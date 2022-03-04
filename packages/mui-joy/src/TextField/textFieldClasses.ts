import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface TextFieldClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
  /** Styles applied to the root element if the component is focused. */
  focused: string;
}

export type TextFieldClassKey = keyof TextFieldClasses;

export function getTextFieldUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTextField', slot);
}

const textFieldClasses: TextFieldClasses = generateUtilityClasses('MuiTextField', [
  'root',
  'disabled',
  'error',
  'focused',
]);

export default textFieldClasses;
