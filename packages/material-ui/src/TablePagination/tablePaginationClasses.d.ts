import { TablePaginationClassKey } from './TablePagination';

export type TablePaginationClasses = Record<TablePaginationClassKey, string>;

declare const tablePaginationClasses: TablePaginationClasses;

export function getTablePaginationUtilityClass(slot: string): string;

export default tablePaginationClasses;
