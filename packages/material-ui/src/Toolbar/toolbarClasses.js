import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getToolbarUtilityClass(slot) {
  return generateUtilityClass('MuiToolbar', slot);
}

const toolbarClasses = generateUtilityClasses('MuiToolbar', [
  'root',
  'gutters',
  'dense',
  'regular',
]);

export default toolbarClasses;
