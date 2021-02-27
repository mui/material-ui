import { PaginationClassKey } from './Pagination';

export type PaginationClasses = Record<PaginationClassKey, string>;

declare const paginationClasses: PaginationClasses;

export function getPaginationUtilityClass(slot: string): string;

export default paginationClasses;
