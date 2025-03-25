import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { ListItemAvatarClasses } from './listItemAvatarClasses';

export interface ListItemAvatarProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component, normally an `Avatar`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ListItemAvatarClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 * A simple wrapper to apply `List` styles to an `Avatar`.
 *
 * Demos:
 *
 * - [Lists](https://v6.mui.com/material-ui/react-list/)
 *
 * API:
 *
 * - [ListItemAvatar API](https://v6.mui.com/material-ui/api/list-item-avatar/)
 */
export default function ListItemAvatar(props: ListItemAvatarProps): React.JSX.Element;
