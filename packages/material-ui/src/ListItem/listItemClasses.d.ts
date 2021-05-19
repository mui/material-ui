import { ListItemClassKey } from './ListItem';

export type ListItemClasses = Record<ListItemClassKey, string>;

declare const listItemClasses: ListItemClasses;

export function getListItemUtilityClass(slot: string): string;

export default listItemClasses;
