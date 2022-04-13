import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface RadioGroupClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type RadioGroupClassKey = keyof RadioGroupClasses;

export function getRadioGroupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiRadioGroup', slot);
}

const radioGroupClasses: RadioGroupClasses = generateUtilityClasses('MuiRadioGroup', ['root']);

export default radioGroupClasses;
