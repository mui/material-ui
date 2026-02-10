import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface StepContentClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `last={true}` (controlled by `Step`). */
  last: string;
  /** Styles applied to the Transition component. */
  transition: string;
}

export type StepContentClassKey = keyof StepContentClasses;

export function getStepContentUtilityClass(slot: string): string {
  return generateUtilityClass('MuiStepContent', slot);
}

const stepContentClasses: StepContentClasses = generateUtilityClasses('MuiStepContent', [
  'root',
  'last',
  'transition',
]);

export default stepContentClasses;
