import {
  unstable_generateUtilityClass as generateUtilityClass,
  unstable_generateUtilityClasses as generateUtilityClasses,
} from '@mui/utils';

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
