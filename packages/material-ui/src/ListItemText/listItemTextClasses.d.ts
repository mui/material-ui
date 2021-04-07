import { ListItemTextClassKey } from './ListItemText';

export type ListItemTextClasses = Record<ListItemTextClassKey, string>;

declare const listItemTextClasses: ListItemTextClasses;

export function getListItemTextUtilityClass(slot: string): string;

export default listItemTextClasses;
