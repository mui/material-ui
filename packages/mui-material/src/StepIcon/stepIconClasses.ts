import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

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

const stepIconClasses: StepIconClasses = generateUtilityClasses('MuiStepIcon', [
  'root',
  'active',
  'completed',
  'error',
  'text',
]);

export default stepIconClasses;
