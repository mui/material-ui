import { ListClassKey } from './List';

export type ListClasses = Record<ListClassKey, string>;

declare const listClasses: ListClasses;

export function getListUtilityClass(slot: string): string;

export default listClasses;
