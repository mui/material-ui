import { StandardProps } from '..';

export interface ListItemAvatarProps
  extends StandardProps<{}, ListItemAvatarClassKey, never, false> {}

export type ListItemAvatarClassKey = 'root' | 'icon';

declare const ListItemAvatar: React.ComponentType<ListItemAvatarProps>;

export default ListItemAvatar;
