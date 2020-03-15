import { StandardProps } from '..';

export interface ListItemAvatarProps extends StandardProps<{}, ListItemAvatarClassKey> {
  children: React.ReactElement;
}

export type ListItemAvatarClassKey = 'root' | 'icon';

/**
 * A simple wrapper to apply `List` styles to an `Avatar`.
 *
 * Demos:
 * - {@link https://material-ui.com/components/lists/ Lists}
 *
 * API:
 * - {@link https://material-ui.com/api/list-item-avatar/ ListItemAvatar API}
 *
 */
declare const ListItemAvatar: React.ComponentType<ListItemAvatarProps>;

export default ListItemAvatar;
