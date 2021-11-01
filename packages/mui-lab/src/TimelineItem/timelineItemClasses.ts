import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface TimelineItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `position="left"`. */
  positionLeft: string;
  /** Styles applied to the root element if `position="right"`. */
  positionRight: string;
  /** Styles applied to the root element if `position="alternate"`. */
  positionAlternate: string;
  /** Styles applied to the root element if TimelineOppositeContent isn't provided. */
  missingOppositeContent: string;
}

export type TimelineItemClassKey = keyof TimelineItemClasses;

export function getTimelineItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTimelineItem', slot);
}

export const getTimelineItemClasses = (): TimelineItemClasses =>
  generateUtilityClasses('MuiTimelineItem', [
    'root',
    'positionLeft',
    'positionRight',
    'positionAlternate',
    'missingOppositeContent',
  ]);

const timelineItemClasses = getTimelineItemClasses();

export default timelineItemClasses;
