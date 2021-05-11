import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTimelineContentUtilityClass(slot) {
  return generateUtilityClass('MuiTimelineContent', slot);
}

const timelineContentClasses = generateUtilityClasses('MuiTimelineContent', [
  'root',
  'positionLeft',
  'positionRight',
  'positionAlternate',
]);

export default timelineContentClasses;
