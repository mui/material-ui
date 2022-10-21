import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface ScopedCssBaselineClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ScopedCssBaselineClassKey = keyof ScopedCssBaselineClasses;

export function getScopedCssBaselineUtilityClass(slot: string): string {
  return generateUtilityClass('JoyScopedCssBaseline', slot);
}

const scopedCssBaselineClasses = generateUtilityClasses('JoyScopedCssBaseline', ['root']);

export default scopedCssBaselineClasses;
