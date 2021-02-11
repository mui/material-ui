import { ListItemAvatarClassKey } from './ListItemAvatar';

export type ListItemAvatarClasses = Record<ListItemAvatarClassKey, string>;

declare const listItemAvatarClasses: ListItemAvatarClasses;

export function getListItemAvatarUtilityClass(slot: string): string;

export default listItemAvatarClasses;
