import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTimelineUtilityClass(slot: string) {
  return generateUtilityClass('MuiTimeline', slot);
}

const timelineClasses = generateUtilityClasses('MuiTimeline', [
  'root',
  'alignLeft',
  'alignRight',
  'alignAlternate',
]);

export default timelineClasses;
