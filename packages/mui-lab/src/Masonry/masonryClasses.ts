import {
  unstable_generateUtilityClass as generateUtilityClass,
  unstable_generateUtilityClasses as generateUtilityClasses,
} from '@mui/utils';

export interface MasonryClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type MasonryClassKey = keyof MasonryClasses;

export function getMasonryUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMasonry', slot);
}

const masonryClasses: MasonryClasses = generateUtilityClasses('MuiMasonry', ['root']);

export default masonryClasses;
