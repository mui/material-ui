import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface MenuItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the `component`'s `focusVisibleClassName` prop. */
  focusVisible: string;
  /** State class applied to the inner `component` element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `selected={true}`. */
  selected: string;
}

export type MenuItemClassKey = keyof MenuItemClasses;

export function getMenuItemUtilityClass(slot: string): string {
  return generateUtilityClass('JoyMenuItem', slot);
}

const menuItemClasses: MenuItemClasses = generateUtilityClasses('JoyMenuItem', [
  'root',
  'focusVisible',
  'disabled',
  'selected',
]);

export default menuItemClasses;
