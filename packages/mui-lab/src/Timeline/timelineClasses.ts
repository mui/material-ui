import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export function getTimelineUtilityClass(slot: string) {
  return generateUtilityClass('MuiTimeline', slot);
}

const timelineClasses = generateUtilityClasses('MuiTimeline', [
  'root',
  'positionLeft',
  'positionRight',
  'positionAlternate',
]);

export default timelineClasses;
