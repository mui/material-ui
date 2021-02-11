import { ListSubheaderClassKey } from './ListSubheader';

export type ListSubheaderClasses = Record<ListSubheaderClassKey, string>;

declare const listSubheaderClasses: ListSubheaderClasses;

export function getListSubheaderUtilityClass(slot: string): string;

export default listSubheaderClasses;
