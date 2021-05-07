import { TableCellClassKey } from './TableCell';

export type TableCellClasses = Record<TableCellClassKey, string>;

declare const tableCellClasses: TableCellClasses;

export function getTableCellUtilityClass(slot: string): string;

export default tableCellClasses;
