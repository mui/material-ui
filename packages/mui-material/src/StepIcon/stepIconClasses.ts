import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface StepIconClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the SVG text element. */
  text: string;
  /** State class applied to the root element if `active={true}`. */
  active: string;
  /** State class applied to the root element if `completed={true}`. */
  completed: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
}

export type StepIconClassKey = keyof StepIconClasses;

export function getStepIconUtilityClass(slot: string): string {
  return generateUtilityClass('MuiStepIcon', slot);
}

export const getStepIconClasses = (): StepIconClasses => generateUtilityClasses('MuiStepIcon', [
  'root',
  'active',
  'completed',
  'error',
  'text',
]);

const stepIconClasses = getStepIconClasses();

export default stepIconClasses;
