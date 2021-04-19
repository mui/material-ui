import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTimelineItemUtilityClass(slot) {
  return generateUtilityClass('MuiTimelineItem', slot);
}

const timelineItemClasses = generateUtilityClasses('MuiTimelineItem', [
  'root',
  'alignLeft',
  'alignRight',
  'alignAlternate',
  'missingOppositeContent',
]);

export default timelineItemClasses;
