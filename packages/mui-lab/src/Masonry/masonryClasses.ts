import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface MasonryClasses {
  /** Styles applied to the root element. */
  root: string;
  break: string;
}

export type MasonryClassKey = keyof MasonryClasses;

export function getMasonryUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMasonry', slot);
}

const masonryClasses: MasonryClasses = generateUtilityClasses('MuiMasonry', ['root', 'break']);

export default masonryClasses;
