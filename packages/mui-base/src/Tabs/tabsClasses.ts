import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';

const COMPONENT_NAME = 'Tabs';

export interface TabsClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if `orientation='horizontal'`. */
  horizontal: string;
  /** Class name applied to the root element if `orientation='vertical'`. */
  vertical: string;
}

export type TabsClassKey = keyof TabsClasses;

export function getTabsUtilityClass(slot: string): string {
  return generateUtilityClass(COMPONENT_NAME, slot);
}

export const tabsClasses: TabsClasses = generateUtilityClasses(COMPONENT_NAME, [
  'root',
  'horizontal',
  'vertical',
]);
