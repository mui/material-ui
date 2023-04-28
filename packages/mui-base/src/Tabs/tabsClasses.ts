import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

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
  return generateUtilityClass('MuiTabs', slot);
}

const tabsClasses: TabsClasses = generateUtilityClasses('MuiTabs', [
  'root',
  'horizontal',
  'vertical',
]);

export default tabsClasses;
