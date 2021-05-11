import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTimelineDotUtilityClass(slot) {
  return generateUtilityClass('MuiTimelineDot', slot);
}

const timelineDotClasses = generateUtilityClasses('MuiTimelineDot', [
  'root',
  'filled',
  'outlined',
  'filledGrey',
  'outlinedGrey',
  'filledPrimary',
  'outlinedPrimary',
  'filledSecondary',
  'outlinedSecondary',
]);

export default timelineDotClasses;
