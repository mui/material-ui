import { TimelineDotClassKey } from './TimelineDot';

export type TimelineDotClasses = Record<TimelineDotClassKey, string>;

declare const timelineDotClasses: TimelineDotClasses;

export function getTimelineDotUtilityClass(slot: string): string;

export default timelineDotClasses;
