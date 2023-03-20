import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface TabsUnstyledClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `div` element if `orientation='horizontal'`. */
  horizontal: string;
  /** State class applied to the root `div` element if `orientation='vertical'`. */
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
