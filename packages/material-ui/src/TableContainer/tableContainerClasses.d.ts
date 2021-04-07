import { TableContainerClassKey } from './TableContainer';

export type TableContainerClasses = Record<TableContainerClassKey, string>;

declare const tableContainerClasses: TableContainerClasses;

export function getTableContainerUtilityClass(slot: string): string;

export default tableContainerClasses;
