import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface BottomNavigationClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type BottomNavigationClassKey = keyof BottomNavigationClasses;

export function getBottomNavigationUtilityClass(slot: string): string {
  return generateUtilityClass('MuiBottomNavigation', slot);
}

export const getBottomNavigationClasses = (): BottomNavigationClasses => generateUtilityClasses(
  'MuiBottomNavigation',
  ['root'],
);

const bottomNavigationClasses = getBottomNavigationClasses();

export default bottomNavigationClasses;
