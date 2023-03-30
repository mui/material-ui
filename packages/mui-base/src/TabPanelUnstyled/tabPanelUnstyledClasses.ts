import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface TabPanelUnstyledClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `div` element if `hidden={true}`. */
  hidden: string;
}

export type TabPanelUnstyledClassKey = keyof TabPanelUnstyledClasses;

export function getTabPanelUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTabPanel', slot);
}

const tabPanelUnstyledClasses: TabPanelUnstyledClasses = generateUtilityClasses('MuiTabPanel', [
  'root',
  'hidden',
]);

export default tabPanelUnstyledClasses;
