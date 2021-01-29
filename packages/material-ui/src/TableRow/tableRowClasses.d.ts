import { TableRowClassKey } from './TableRow';

declare const tableRowClasses: Record<TableRowClassKey, string>;

export function getTableRowUtilityClass(slot: string): string;

export default tableRowClasses;
