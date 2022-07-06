import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface TabsListUnstyledClasses {
  root: string;
  horizontal: string;
  vertical: string;
}

export type TabsListUnstyledClassKey = keyof TabsListUnstyledClasses;

export function getTabsListUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('BaseTabsList', slot);
}

const tabsListUnstyledClasses: TabsListUnstyledClasses = generateUtilityClasses('BaseTabsList', [
  'root',
  'horizontal',
  'vertical',
]);

export default tabsListUnstyledClasses;
