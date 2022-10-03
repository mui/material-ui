import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface FormLabelClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the asterisk element. */
  asterisk: string;
}

export type FormLabelClassKey = keyof FormLabelClasses;

export function getFormLabelUtilityClass(slot: string): string {
  return generateUtilityClass('JoyFormLabel', slot);
}

const formLabelClasses: FormLabelClasses = generateUtilityClasses('JoyFormLabel', [
  'root',
  'asterisk',
]);

export default formLabelClasses;
