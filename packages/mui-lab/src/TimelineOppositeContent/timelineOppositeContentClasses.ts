import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';

export interface TimelineOppositeContentClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `position="right"`. */
  positionRight: string;
  /** Styles applied to the root element if `position="left"`. */
  positionLeft: string;
  /** Styles applied to the root element if `position="alternate"`. */
  positionAlternate: string;
}

export type TimelineOppositeContentClassKey = keyof TimelineOppositeContentClasses;

export function getTimelineOppositeContentUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTimelineOppositeContent', slot);
}

const timelineOppositeContentClasses: TimelineOppositeContentClasses = generateUtilityClasses(
  'MuiTimelineOppositeContent',
  ['root', 'positionLeft', 'positionRight', 'positionAlternate'],
);

export default timelineOppositeContentClasses;
