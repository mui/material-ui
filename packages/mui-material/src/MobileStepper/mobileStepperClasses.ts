import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface MobileStepperClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `position="bottom"`. */
  positionBottom: string;
  /** Styles applied to the root element if `position="top"`. */
  positionTop: string;
  /** Styles applied to the root element if `position="static"`. */
  positionStatic: string;
  /** Styles applied to the dots container if `variant="dots"`. */
  dots: string;
  /** Styles applied to each dot if `variant="dots"`. */
  dot: string;
  /** Styles applied to a dot if `variant="dots"` and this is the active step. */
  dotActive: string;
  /** Styles applied to the Linear Progress component if `variant="progress"`. */
  progress: string;
}

export type MobileStepperClassKey = keyof MobileStepperClasses;

export function getMobileStepperUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMobileStepper', slot);
}

const mobileStepperClasses: MobileStepperClasses = generateUtilityClasses('MuiMobileStepper', [
  'root',
  'positionBottom',
  'positionTop',
  'positionStatic',
  'dots',
  'dot',
  'dotActive',
  'progress',
]);

export default mobileStepperClasses;
