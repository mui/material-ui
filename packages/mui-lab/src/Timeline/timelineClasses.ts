import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';

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
