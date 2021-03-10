import { MenuItemClassKey } from './MenuItem';

declare const menuItemClasses: Record<MenuItemClassKey, string>;

export function getMenuItemUtilityClass(slot: string): string;

export default menuItemClasses;
