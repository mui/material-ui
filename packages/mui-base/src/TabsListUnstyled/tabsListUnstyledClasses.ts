import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface TabsListUnstyledClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `div` element if `orientation='horizontal'`. */
  horizontal: string;
  /** State class applied to the root `div` element if `orientation='vertical'`. */
  vertical: string;
}

export type TabsListUnstyledClassKey = keyof TabsListUnstyledClasses;

export function getTabsListUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTabsList', slot);
}

const tabsListUnstyledClasses: TabsListUnstyledClasses = generateUtilityClasses('MuiTabsList', [
  'root',
  'horizontal',
  'vertical',
]);

export default tabsListUnstyledClasses;
