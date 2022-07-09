import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface MenuButtonClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type MenuButtonClassKey = keyof MenuButtonClasses;

export function getMenuButtonUtilityClass(slot: string): string {
  return generateUtilityClass('JoyMenuButton', slot);
}

const menuButtonClasses: MenuButtonClasses = generateUtilityClasses('JoyMenuButton', ['root']);

export default menuButtonClasses;
