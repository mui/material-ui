import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getAppBarUtilityClass(slot) {
  return generateUtilityClass('MuiAppBar', slot);
}

const appBarClasses = generateUtilityClasses('MuiAppBar', [
  'root',
  'positionFixed',
  'positionAbsolute',
  'positionSticky',
  'positionStatic',
  'positionRelative',
  'colorDefault',
  'colorPrimary',
  'colorSecondary',
  'colorInherit',
  'colorTransparent',
]);

export default appBarClasses;
