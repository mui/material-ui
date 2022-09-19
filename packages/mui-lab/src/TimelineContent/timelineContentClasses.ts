import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';

export interface TimelineContentClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `position="right"`. */
  positionRight: string;
  /** Styles applied to the root element if `position="left"`. */
  positionLeft: string;
  /** Styles applied to the root element if `position="alternate"`. */
  positionAlternate: string;
}

export type TimelineContentClassKey = keyof TimelineContentClasses;

export function getTimelineContentUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTimelineContent', slot);
}

const timelineContentClasses: TimelineContentClasses = generateUtilityClasses(
  'MuiTimelineContent',
  ['root', 'positionLeft', 'positionRight', 'positionAlternate'],
);

export default timelineContentClasses;
