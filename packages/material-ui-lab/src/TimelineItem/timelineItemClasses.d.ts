import { TimelineItemClassKey } from './TimelineItem';

export type TimelineItemClasses = Record<TimelineItemClassKey, string>;

declare const timelineItemClasses: TimelineItemClasses;

export function getTimelineItemUtilityClass(slot: string): string;

export default timelineItemClasses;
