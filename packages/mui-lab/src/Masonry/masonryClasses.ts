import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface MasonryClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type MasonryClassKey = keyof MasonryClasses;

export function getMasonryUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMasonry', slot);
}

export const getMasonryClasses = (): MasonryClasses =>
  generateUtilityClasses('MuiMasonry', ['root']);

const masonryClasses = getMasonryClasses();

export default masonryClasses;
