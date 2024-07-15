import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';

export interface TimelineClasses {
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
}

export type TimelineClassKey = keyof TimelineClasses;

export function getTimelineUtilityClass(slot: string) {
  return generateUtilityClass('MuiTimeline', slot);
}

const timelineClasses: TimelineClasses = generateUtilityClasses('MuiTimeline', [
  'root',
  'positionLeft',
  'positionRight',
  'positionAlternate',
  'positionAlternateReverse',
]);

export default timelineClasses;
