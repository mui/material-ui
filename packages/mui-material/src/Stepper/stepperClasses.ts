import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface StepperClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: string;
  /** Styles applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** Styles applied to the root element if `alternativeLabel={true}`. */
  alternativeLabel: string;
}

export type StepperClassKey = keyof StepperClasses;

export function getStepperUtilityClass(slot: string): string {
  return generateUtilityClass('MuiStepper', slot);
}

const stepperClasses: StepperClasses = generateUtilityClasses('MuiStepper', [
  'root',
  'horizontal',
  'vertical',
  'alternativeLabel',
]);

export default stepperClasses;
