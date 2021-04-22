import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getNProgressBarUtilityClass(slot) {
  return generateUtilityClass('MuiNProgressBar', slot);
}

const NProgressBarClasses = generateUtilityClasses('MuiNProgressBar', [
  'root',
  'colorPrimary',
  'colorSecondary',
  'bar',
  'barColorPrimary',
  'barColorSecondary',
  'bar1',
  'bar2',
]);

export default NProgressBarClasses;
