import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface ScopedCssBaselineClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ScopedCssBaselineClassKey = keyof ScopedCssBaselineClasses;

export function getScopedCssBaselineUtilityClass(slot: string): string {
  return generateUtilityClass('MuiScopedCssBaseline', slot);
}

export const getScopedCssBaselineClasses = () => generateUtilityClasses('MuiScopedCssBaseline', ['root']);

const scopedCssBaselineClasses = getScopedCssBaselineClasses();

export default scopedCssBaselineClasses;
