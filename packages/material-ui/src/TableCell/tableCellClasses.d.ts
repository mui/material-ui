export interface TableCellClasses {
  root: string;
  head: string;
  body: string;
  footer: string;
  sizeSmall: string;
  sizeMedium: string;
  paddingCheckbox: string;
  paddingNone: string;
  alignLeft: string;
  alignCenter: string;
  alignRight: string;
  alignJustify: string;
  stickyHeader: string;
}

declare const tableCellClasses: TableCellClasses;

export function getTableCellUtilityClass(slot: string): string;

export default tableCellClasses;
