import { ListItemIconClassKey } from './ListItemIcon';

export type ListItemIconClasses = Record<ListItemIconClassKey, string>;

declare const listItemIconClasses: ListItemIconClasses;

export function getListItemIconUtilityClass(slot: string): string;

export default listItemIconClasses;
