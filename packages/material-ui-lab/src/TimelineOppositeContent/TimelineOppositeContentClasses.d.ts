import { TimelineOppositeContentClassKey } from './TimelineOppositeContent';

export type TimelineOppositeContentClasses = Record<TimelineOppositeContentClassKey, string>;

declare const timelineOppositeContentClasses: TimelineOppositeContentClasses;

export function getTimelineOppositeContentUtilityClass(slot: string): string;

export default timelineOppositeContentClasses;
