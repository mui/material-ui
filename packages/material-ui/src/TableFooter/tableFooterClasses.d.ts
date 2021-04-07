import { TableFooterClassKey } from './TableFooter';

declare const tableFooterClasses: Record<TableFooterClassKey, string>;

export function getTableFooterUtilityClass(slot: string): string;

export default tableFooterClasses;
