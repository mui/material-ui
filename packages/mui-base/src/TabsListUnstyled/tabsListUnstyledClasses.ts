import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface TabsListUnstyledClasses {
  root: string;
  horizontal: string;
  vertical: string;
}

export type TabsListUnstyledClassKey = keyof TabsListUnstyledClasses;

export function getTabsListUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('TabsListUnstyled', slot);
}

const tabsListUnstyledClasses: TabsListUnstyledClasses = generateUtilityClasses(
  'TabsListUnstyled',
  ['root', 'horizontal', 'vertical'],
);

export default tabsListUnstyledClasses;
