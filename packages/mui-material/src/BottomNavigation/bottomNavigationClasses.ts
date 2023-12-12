import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface BottomNavigationClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type BottomNavigationClassKey = keyof BottomNavigationClasses;

export function getBottomNavigationUtilityClass(slot: string): string {
  return generateUtilityClass('MuiBottomNavigation', slot);
}

const bottomNavigationClasses: BottomNavigationClasses = generateUtilityClasses(
  'MuiBottomNavigation',
  ['root'],
);

export default bottomNavigationClasses;
