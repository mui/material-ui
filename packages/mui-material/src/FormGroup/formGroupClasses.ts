import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface FormGroupClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `row={true}`. */
  row: string;
}

export type FormGroupClassKey = keyof FormGroupClasses;

export function getFormGroupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiFormGroup', slot);
}

export const getFormGroupClasses = (): FormGroupClasses =>
  generateUtilityClasses('MuiFormGroup', ['root', 'row']);

const formGroupClasses = getFormGroupClasses();

export default formGroupClasses;
