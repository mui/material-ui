import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface TabsUnstyledClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if `orientation='horizontal'`. */
  horizontal: string;
  /** Class name applied to the root element if `orientation='vertical'`. */
  vertical: string;
}

export type TabsUnstyledClassKey = keyof TabsUnstyledClasses;

export function getTabsUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTabs', slot);
}

const tabsUnstyledClasses: TabsUnstyledClasses = generateUtilityClasses('MuiTabs', [
  'root',
  'horizontal',
  'vertical',
]);

export default tabsUnstyledClasses;
