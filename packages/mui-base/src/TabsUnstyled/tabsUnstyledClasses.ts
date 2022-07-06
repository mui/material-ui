import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface TabsUnstyledClasses {
  root: string;
  horizontal: string;
  vertical: string;
}

export type TabsUnstyledClassKey = keyof TabsUnstyledClasses;

export function getTabsUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('BaseTabs', slot);
}

const tabsUnstyledClasses: TabsUnstyledClasses = generateUtilityClasses('BaseTabs', [
  'root',
  'horizontal',
  'vertical',
]);

export default tabsUnstyledClasses;
