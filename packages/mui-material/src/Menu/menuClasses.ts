import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface MenuClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the Paper component. */
  paper: string;
  /** Styles applied to the List component via `MenuList`. */
  list: string;
}

export type MenuClassKey = keyof MenuClasses;

export function getMenuUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenu', slot);
}

const menuClasses: MenuClasses = generateUtilityClasses('MuiMenu', ['root', 'paper', 'list']);

export default menuClasses;
