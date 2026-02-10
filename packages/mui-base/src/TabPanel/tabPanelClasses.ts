import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';

const COMPONENT_NAME = 'TabPanel';

export interface TabPanelClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root `div` element if `hidden={true}`. */
  hidden: string;
}

export type TabPanelClassKey = keyof TabPanelClasses;

export function getTabPanelUtilityClass(slot: string): string {
  return generateUtilityClass(COMPONENT_NAME, slot);
}

export const tabPanelClasses: TabPanelClasses = generateUtilityClasses(COMPONENT_NAME, [
  'root',
  'hidden',
]);
