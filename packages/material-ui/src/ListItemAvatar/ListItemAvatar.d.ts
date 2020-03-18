import { StandardProps } from '..';

export interface ListItemAvatarProps extends StandardProps<{}, ListItemAvatarClassKey> {
  children: React.ReactElement;
}

export type ListItemAvatarClassKey = 'root' | 'icon';

declare const ListItemAvatar: React.ComponentType<ListItemAvatarProps>;

export default ListItemAvatar;
