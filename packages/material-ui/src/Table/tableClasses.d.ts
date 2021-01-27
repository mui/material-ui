export interface TableClasses {
  root: string;
  stickyHeader: string;
}

declare const tableClasses: TableClasses;

export function getTableUtilityClass(slot: string): string;

export default tableClasses;
