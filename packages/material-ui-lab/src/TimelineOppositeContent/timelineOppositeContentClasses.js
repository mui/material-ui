import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTimelineOppositeContentUtilityClass(slot) {
  return generateUtilityClass('MuiTimelineOppositeContent', slot);
}

const timelineOppositeContentClasses = generateUtilityClasses('MuiTimelineOppositeContent', [
  'root',
  'alignLeft',
  'alignRight',
  'alignAlternate',
]);

export default timelineOppositeContentClasses;
