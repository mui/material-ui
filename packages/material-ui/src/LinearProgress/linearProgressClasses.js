import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getLinearProgressUtilityClass(slot) {
  return generateUtilityClass('MuiLinearProgress', slot);
}

const linearProgressClasses = generateUtilityClasses('MuiLinearProgress', [
  'root',
  'colorPrimary',
  'colorSecondary',
  'determinate',
  'indeterminate',
  'buffer',
  'query',
  'dashed',
  'dashedColorPrimary',
  'dashedColorSecondary',
  'bar',
  'barColorPrimary',
  'barColorSecondary',
  'bar1Indeterminate',
  'bar1Determinate',
  'bar1Buffer',
  'bar2Indeterminate',
  'bar2Buffer',
]);

export default linearProgressClasses;
