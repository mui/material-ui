import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';

export interface TimelineItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `position="left"`. */
  positionLeft: string;
  /** Styles applied to the root element if `position="right"`. */
  positionRight: string;
  /** Styles applied to the root element if `position="alternate"`. */
  positionAlternate: string;
  /** Styles applied to the root element if `position="alternate-reverse"`. */
  positionAlternateReverse: string;
  /** Styles applied to the root element if TimelineOppositeContent isn't provided. */
  missingOppositeContent: string;
}

export type TimelineItemClassKey = keyof TimelineItemClasses;

export function getTimelineItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTimelineItem', slot);
}

const timelineItemClasses: TimelineItemClasses = generateUtilityClasses('MuiTimelineItem', [
  'root',
  'positionLeft',
  'positionRight',
  'positionAlternate',
  'positionAlternateReverse',
  'missingOppositeContent',
]);

export default timelineItemClasses;
