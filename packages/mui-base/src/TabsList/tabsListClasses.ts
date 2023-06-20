import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface TabsListClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if `orientation='horizontal'`. */
  horizontal: string;
  /** Class name applied to the root element if `orientation='vertical'`. */
  vertical: string;
}

export type TabsListClassKey = keyof TabsListClasses;

export function getTabsListUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTabsList', slot);
}

const tabsListClasses: TabsListClasses = generateUtilityClasses('MuiTabsList', [
  'root',
  'horizontal',
  'vertical',
]);

export default tabsListClasses;
