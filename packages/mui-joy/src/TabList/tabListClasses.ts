import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface TabListClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type TabListClassKey = keyof TabListClasses;

export function getTabListUtilityClass(slot: string): string {
  return generateUtilityClass('JoyTabList', slot);
}

const tabListClasses: TabListClasses = generateUtilityClasses('JoyTabList', ['root']);

export default tabListClasses;
