import { TimelineSeparatorClassKey } from './TimelineSeparator';

export type TimelineSeparatorClasses = Record<TimelineSeparatorClassKey, string>;

declare const timelineSeparatorClasses: TimelineSeparatorClasses;

export function getTimelineSeparatorUtilityClass(slot: string): string;

export default timelineSeparatorClasses;
