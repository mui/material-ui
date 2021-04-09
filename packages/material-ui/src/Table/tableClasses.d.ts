import { TableClassKey } from './Table';

export type TableClasses = Record<TableClassKey, string>;

declare const tableClasses: TableClasses;

export function getTableUtilityClass(slot: string): string;

export default tableClasses;
