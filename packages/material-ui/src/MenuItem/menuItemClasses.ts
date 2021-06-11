import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface MenuItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
  focusVisible: string;
  /** Styles applied to the root element if dense. */
  dense: string;
  /** Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `divider={true}`. */
  divider: string;
  /** Pseudo-class applied to the root element if `selected={true}`. */
  selected: string;
}

export type MenuItemClassKey = keyof MenuItemClasses;

export function getMenuItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuItem', slot);
}

const menuItemClasses: MenuItemClasses = generateUtilityClasses('MuiMenuItem', [
  'root',
  'focusVisible',
  'dense',
  'disabled',
  'divider',
  'selected',
]);

export default menuItemClasses;
