import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getContainerUtilityClass(slot) {
  return generateUtilityClass('MuiContainer', slot);
}

const containerClasses = generateUtilityClasses('MuiContainer', [
  'root',
  'disableGutters',
  'fixed',
  'maxWidthXs',
  'maxWidthSm',
  'maxWidthMd',
  'maxWidthLg',
  'maxWidthXl',
]);

export default containerClasses;
