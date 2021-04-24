import { TabsClassKey } from './Tabs';

export type TabsClasses = Record<TabsClassKey, string>;

declare const tabsClasses: TabsClasses;

export function getTabsUtilityClass(slot: string): string;

export default tabsClasses;
