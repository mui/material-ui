import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface StepClasses {
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

export type StepClassKey = keyof StepClasses;

export function getStepUtilityClass(slot: string): string {
  return generateUtilityClass('MuiStep', slot);
}

const stepClasses: StepClasses = generateUtilityClasses('MuiStep', [
  'root',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'horizontal',
  'vertical',
]);

export default stepClasses;
