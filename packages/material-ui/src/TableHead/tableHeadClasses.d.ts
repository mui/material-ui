import { TableHeadClassKey } from './TableHead';

declare const tableHeadClasses: Record<TableHeadClassKey, string>;

export function getTableHeadUtilityClass(slot: string): string;

export default tableHeadClasses;
