import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface MenuButtonClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `button` element if `active={true}`. */
  active: string;
  /** State class applied to the root `button` element if `disabled={true}`. */
  disabled: string;
}

export type MenuButtonClassKey = keyof MenuButtonClasses;

export function getMenuButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiButton', slot);
}

const menuButtonClasses: MenuButtonClasses = generateUtilityClasses('MuiButton', [
  'root',
  'active',
  'disabled',
]);

export default menuButtonClasses;
