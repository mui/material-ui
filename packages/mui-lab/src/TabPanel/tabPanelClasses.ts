import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';

export interface TabPanelClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type TabPanelClassKey = keyof TabPanelClasses;

export function getTabPanelUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTabPanel', slot);
}

const tabPanelClasses: TabPanelClasses = generateUtilityClasses('MuiTabPanel', ['root']);

export default tabPanelClasses;
