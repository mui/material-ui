import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface StepButtonClasses {
  /** Class name applied to the root element. */
  root: string;
}

export type StepButtonClassKey = keyof StepButtonClasses;

export function getStepButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiStepButton', slot);
}

const stepButtonClasses: StepButtonClasses = generateUtilityClasses('MuiStepButton', ['root']);

export default stepButtonClasses;
