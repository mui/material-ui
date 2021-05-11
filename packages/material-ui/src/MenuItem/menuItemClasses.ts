import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface MenuItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element unless `disableGutters={true}`. */
  gutters: string;
  /** Styles applied to the root element if `selected={true}`. */
  selected: string;
  /** Styles applied to the root element if dense. */
  dense: string;
}

export type MenuItemClassKey = keyof MenuItemClasses;

export function getMenuItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuItem', slot);
}

const menuItemClasses: MenuItemClasses = generateUtilityClasses('MuiMenuItem', [
  'root',
  'gutters',
  'selected',
  'dense',
]);

export default menuItemClasses;
