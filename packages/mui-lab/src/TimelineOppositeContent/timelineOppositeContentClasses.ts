import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

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

export const getTimelineOppositeContentClasses = (): TimelineOppositeContentClasses => generateUtilityClasses(
  'MuiTimelineOppositeContent',
  ['root', 'positionLeft', 'positionRight', 'positionAlternate'],
);

const timelineOppositeContentClasses = getTimelineOppositeContentClasses();

export default timelineOppositeContentClasses;
