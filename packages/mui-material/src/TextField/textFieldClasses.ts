import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface TextFieldClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type TextFieldClassKey = keyof TextFieldClasses;

export function getTextFieldUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTextField', slot);
}

export const getTextFieldClasses = (): TextFieldClasses => generateUtilityClasses('MuiTextField', ['root']);

const textFieldClasses = getTextFieldClasses();

export default textFieldClasses;
