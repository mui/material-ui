import { TabClassKey } from './Tab';

export type TabClasses = Record<TabClassKey, string>;

declare const tabClasses: TabClasses;

export function getTabUtilityClass(slot: string): string;

export default tabClasses;
