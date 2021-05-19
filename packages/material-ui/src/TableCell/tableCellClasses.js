import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTableCellUtilityClass(slot) {
  return generateUtilityClass('MuiTableCell', slot);
}

const tableCellClasses = generateUtilityClasses('MuiTableCell', [
  'root',
  'head',
  'body',
  'footer',
  'sizeSmall',
  'sizeMedium',
  'paddingCheckbox',
  'paddingNone',
  'alignLeft',
  'alignCenter',
  'alignRight',
  'alignJustify',
  'stickyHeader',
]);

export default tableCellClasses;
