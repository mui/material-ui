import { StandardProps } from '..';

export interface ListItemAvatarProps extends StandardProps<{}, ListItemAvatarClassKey> {
  /**
   * The content of the component – normally `Avatar`.
   */
  children: React.ReactElement;
}

export type ListItemAvatarClassKey = 'root' | 'icon';

/**
 * A simple wrapper to apply `List` styles to an `Avatar`.
 * Demos:
 *
 * - [Lists](https://mui.com/components/lists/)
 *
 * API:
 *
 * - [ListItemAvatar API](https://mui.com/api/list-item-avatar/)
 */
export default function ListItemAvatar(props: ListItemAvatarProps): JSX.Element;
