import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface TableCellClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="head"` or `context.table.head`. */
  head: string;
  /** Styles applied to the root element if `variant="body"` or `context.table.body`. */
  body: string;
  /** Styles applied to the root element if `variant="footer"` or `context.table.footer`. */
  footer: string;
  /** Styles applied to the root element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the root element if `size="medium"`. */
  sizeMedium: string;
  /** Styles applied to the root element if `padding="checkbox"`. */
  paddingCheckbox: string;
  /** Styles applied to the root element if `padding="none"`. */
  paddingNone: string;
  /** Styles applied to the root element if `align="left"`. */
  alignLeft: string;
  /** Styles applied to the root element if `align="center"`. */
  alignCenter: string;
  /** Styles applied to the root element if `align="right"`. */
  alignRight: string;
  /** Styles applied to the root element if `align="justify"`. */
  alignJustify: string;
  /** Styles applied to the root element if `context.table.stickyHeader={true}`. */
  stickyHeader: string;
}

export type TableCellClassKey = keyof TableCellClasses;

export function getTableCellUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTableCell', slot);
}

const tableCellClasses: TableCellClasses = generateUtilityClasses('MuiTableCell', [
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
