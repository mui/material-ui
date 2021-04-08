import { TimelineConnectorClassKey } from './TimelineConnector';

export type TimelineConnectorClasses = Record<TimelineConnectorClassKey, string>;

declare const timelineConnectorClasses: TimelineConnectorClasses;

export function getTimelineConnectorUtilityClass(slot: string): string;

export default timelineConnectorClasses;
