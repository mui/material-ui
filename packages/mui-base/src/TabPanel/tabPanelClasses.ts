import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface TabPanelClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `div` element if `hidden={true}`. */
  hidden: string;
}

export type TabPanelClassKey = keyof TabPanelClasses;

export function getTabPanelUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTabPanel', slot);
}

const tabPanelClasses: TabPanelClasses = generateUtilityClasses('MuiTabPanel', ['root', 'hidden']);

export default tabPanelClasses;
