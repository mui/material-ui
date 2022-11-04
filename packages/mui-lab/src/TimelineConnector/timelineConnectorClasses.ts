import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';

export interface TimelineConnectorClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type TimelineConnectorClassKey = keyof TimelineConnectorClasses;

export function getTimelineConnectorUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTimelineConnector', slot);
}

const timelineConnectorClasses: TimelineConnectorClasses = generateUtilityClasses(
  'MuiTimelineConnector',
  ['root'],
);

export default timelineConnectorClasses;
