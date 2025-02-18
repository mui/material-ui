import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface TextFieldClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type TextFieldClassKey = keyof TextFieldClasses;

export function getTextFieldUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTextField', slot);
}

const textFieldClasses: TextFieldClasses = generateUtilityClasses('MuiTextField', ['root']);

export default textFieldClasses;
