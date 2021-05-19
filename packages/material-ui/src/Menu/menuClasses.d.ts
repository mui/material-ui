import { MenuClassKey } from './Menu';

export type MenuClasses = Record<MenuClassKey, string>;

declare const menuClasses: MenuClasses;

export function getMenuUtilityClass(slot: string): string;

export default menuClasses;
