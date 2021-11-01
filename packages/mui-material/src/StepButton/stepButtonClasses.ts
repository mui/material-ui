import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface StepButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: string;
  /** Styles applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** Styles applied to the `ButtonBase` touch-ripple. */
  touchRipple: string;
}

export type StepButtonClassKey = keyof StepButtonClasses;

export function getStepButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiStepButton', slot);
}

export const getStepButtonClasses = (): StepButtonClasses => generateUtilityClasses('MuiStepButton', [
  'root',
  'horizontal',
  'vertical',
  'touchRipple',
]);

const stepButtonClasses = getStepButtonClasses();

export default stepButtonClasses;
