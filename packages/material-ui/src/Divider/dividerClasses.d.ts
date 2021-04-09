import { DividerClassKey } from './Divider';

export type DividerClasses = Record<DividerClassKey, string>;

declare const dividerClasses: DividerClasses;

export function getDividerUtilityClass(slot: string): string;

export default dividerClasses;
