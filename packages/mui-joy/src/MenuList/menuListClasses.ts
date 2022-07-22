import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface MenuListClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if wrapped with nested context. */
  nested: string;
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
  sizeLg: string;
}

export type MenuListClassKey = keyof MenuListClasses;

export function getMenuListUtilityClass(slot: string): string {
  return generateUtilityClass('JoyMenuList', slot);
}

const menuClasses: MenuListClasses = generateUtilityClasses('JoyMenuList', [
  'root',
  'nested',
  'sizeSm',
  'sizeMd',
  'sizeLg',
]);

export default menuClasses;
