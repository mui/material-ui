import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export function getTimelineUtilityClass(slot: string) {
  return generateUtilityClass('MuiTimeline', slot);
}

export const getTimelineClasses = () => generateUtilityClasses('MuiTimeline', [
  'root',
  'positionLeft',
  'positionRight',
  'positionAlternate',
]);

const timelineClasses = getTimelineClasses();

export default timelineClasses;
