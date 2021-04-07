import { ListItemSecondaryActionClassKey } from './ListItemSecondaryAction';

export type ListItemSecondaryActionClasses = Record<ListItemSecondaryActionClassKey, string>;

declare const listItemSecondaryActionClasses: ListItemSecondaryActionClasses;

export function getListItemSecondaryActionClassesUtilityClass(slot: string): string;

export default listItemSecondaryActionClasses;
