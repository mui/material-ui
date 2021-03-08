import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getMenuUtilityClass(slot) {
  return generateUtilityClass('MuiMenu', slot);
}

const menuClasses = generateUtilityClasses('MuiMenu', ['paper', 'list']);

export default menuClasses;
