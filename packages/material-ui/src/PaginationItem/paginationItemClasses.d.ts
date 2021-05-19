import { PaginationItemClassKey } from './PaginationItem';

export type PaginationItemClasses = Record<PaginationItemClassKey, string>;

declare const paginationItemClasses: PaginationItemClasses;

export function getPaginationItemUtilityClass(slot: string): string;

export default paginationItemClasses;
