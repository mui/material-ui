import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface TabPanelClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type TabPanelClassKey = keyof TabPanelClasses;

export function getTabPanelUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTabPanel', slot);
}

export const getTabPanelClasses = (): TabPanelClasses => generateUtilityClasses('MuiTabPanel', ['root']);

const tabPanelClasses = getTabPanelClasses();

export default tabPanelClasses;
