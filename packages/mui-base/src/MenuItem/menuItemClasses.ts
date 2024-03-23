import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';

const COMPONENT_NAME = 'MenuItem';

export interface MenuItemClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `button` element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root `button` element if `focusVisible={true}`. */
  focusVisible: string;
}

export type MenuItemClassKey = keyof MenuItemClasses;

export function getMenuItemUtilityClass(slot: string): string {
  return generateUtilityClass(COMPONENT_NAME, slot);
}

export const menuItemClasses: MenuItemClasses = generateUtilityClasses(COMPONENT_NAME, [
  'root',
  'disabled',
  'focusVisible',
]);
