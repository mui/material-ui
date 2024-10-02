import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface StepperClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: string;
  /** Styles applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** Styles applied to the root element if `nonLinear={true}`. */
  nonLinear: string;
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
  'nonLinear',
  'alternativeLabel',
]);

export default stepperClasses;
