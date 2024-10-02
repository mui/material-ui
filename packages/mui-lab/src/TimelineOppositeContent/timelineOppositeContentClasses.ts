import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';

export interface TimelineOppositeContentClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `position="right"`. */
  positionRight: string;
  /** Styles applied to the root element if `position="left"`. */
  positionLeft: string;
  /** Styles applied to the root element if `position="alternate"`. */
  positionAlternate: string;
  /** Styles applied to the root element if `position="alternate-reverse"`. */
  positionAlternateReverse: string;
}

export type TimelineOppositeContentClassKey = keyof TimelineOppositeContentClasses;

export function getTimelineOppositeContentUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTimelineOppositeContent', slot);
}

const timelineOppositeContentClasses: TimelineOppositeContentClasses = generateUtilityClasses(
  'MuiTimelineOppositeContent',
  ['root', 'positionLeft', 'positionRight', 'positionAlternate', 'positionAlternateReverse'],
);

export default timelineOppositeContentClasses;
