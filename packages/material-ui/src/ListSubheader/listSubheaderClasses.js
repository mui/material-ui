import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getListSubheaderUtilityClass(slot) {
  return generateUtilityClass('MuiListSubheader', slot);
}

const listSubheaderClasses = generateUtilityClasses('MuiListSubheader', [
  'root',
  'colorPrimary',
  'colorInherit',
  'gutters',
  'inset',
  'sticky',
]);

export default listSubheaderClasses;
