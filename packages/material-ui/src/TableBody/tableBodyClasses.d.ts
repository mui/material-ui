import { TableBodyClassKey } from './TableBody';

declare const tableBodyClasses: Record<TableBodyClassKey, string>;

export function getTableBodyUtilityClass(slot: string): string;

export default tableBodyClasses;
