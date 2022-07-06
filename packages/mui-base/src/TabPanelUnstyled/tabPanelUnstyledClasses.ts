import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface TabPanelUnstyledClasses {
  root: string;
  hidden: string;
}

export type TabPanelUnstyledClassKey = keyof TabPanelUnstyledClasses;

export function getTabPanelUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('BaseTabPanel', slot);
}

const tabPanelUnstyledClasses: TabPanelUnstyledClasses = generateUtilityClasses('BaseTabPanel', [
  'root',
  'hidden',
]);

export default tabPanelUnstyledClasses;
