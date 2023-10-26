import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface StepIndicatorClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Class name applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Class name applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Class name applied to the root element if `orientation="horizontal"`. */
  horizontal: string;
  /** Class name applied to the root element if `orientation="vertical"`. */
  vertical: string;
}

export type StepIndicatorClassKey = keyof StepIndicatorClasses;

export function getStepIndicatorUtilityClass(slot: string): string {
  return generateUtilityClass('MuiStepIndicator', slot);
}

const stepIndicatorClasses: StepIndicatorClasses = generateUtilityClasses('MuiStepIndicator', [
  'root',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'horizontal',
  'vertical',
]);

export default stepIndicatorClasses;
