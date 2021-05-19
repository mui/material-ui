import { TabPanelClassKey } from './TabPanel';

export type TabPanelClasses = Record<TabPanelClassKey, string>;

declare const tabPanelClasses: TabPanelClasses;

export function getTabPanelUtilityClass(slot: string): string;

export default tabPanelClasses;
