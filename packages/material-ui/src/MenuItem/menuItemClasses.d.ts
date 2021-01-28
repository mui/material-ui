export interface MenuItemClasses {
  root: string;
  gutters: string;
  selected: string;
  dense: string;
}

declare const menuItemClasses: MenuItemClasses;

export function getMenuItemUtilityClass(slot: string): string;

export default menuItemClasses;
