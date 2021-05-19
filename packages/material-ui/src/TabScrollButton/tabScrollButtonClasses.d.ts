import { TabScrollButtonClassKey } from './TabScrollButton';

export type TabScrollButtonClasses = Record<TabScrollButtonClassKey, string>;

declare const tabScrollButtonClasses: TabScrollButtonClasses;

export function getTabScrollButtonUtilityClass(slot: string): string;

export default tabScrollButtonClasses;
