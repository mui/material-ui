import { TimelineContentClassKey } from './TimelineContent';

export type TimelineContentClasses = Record<TimelineContentClassKey, string>;

declare const timelineContentClasses: TimelineContentClasses;

export function getTimelineContentUtilityClass(slot: string): string;

export default timelineContentClasses;
