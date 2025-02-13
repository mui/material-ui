import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';

const COMPONENT_NAME = 'MenuButton';

export interface MenuButtonClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root element if `active={true}`. */
  active: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if the associated menu is open. */
  expanded: string;
}

export type MenuButtonClassKey = keyof MenuButtonClasses;

export function getMenuButtonUtilityClass(slot: string): string {
  return generateUtilityClass(COMPONENT_NAME, slot);
}

export const menuButtonClasses: MenuButtonClasses = generateUtilityClasses(COMPONENT_NAME, [
  'root',
  'active',
  'disabled',
  'expanded',
]);
