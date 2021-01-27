import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getBottomNavigationUtilityClass(slot) {
  return generateUtilityClass('MuiBottomNavigation', slot);
}

const bottomNavigationClasses = generateUtilityClasses('MuiBottomNavigation', ['root']);

export default bottomNavigationClasses;
