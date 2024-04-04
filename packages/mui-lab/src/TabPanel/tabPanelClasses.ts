import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';

export interface TabPanelClasses {
  /** Styles applied to the root element. */
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
