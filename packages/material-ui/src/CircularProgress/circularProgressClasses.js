import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getCircularProgressUtilityClass(slot) {
  return generateUtilityClass('MuiCircularProgress', slot);
}

const circularProgressClasses = generateUtilityClasses('MuiCircularProgress', [
  'root',
  'determinate',
  'indeterminate',
  'colorPrimary',
  'colorSecondary',
  'svg',
  'circle',
  'circleDeterminate',
  'circleIndeterminate',
  'circleDisableShrink',
]);

export default circularProgressClasses;
