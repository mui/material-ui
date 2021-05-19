import { SxProps } from '@material-ui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';

export interface ListItemAvatarProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component, normally an `Avatar`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`. */
    alignItemsFlexStart?: string;
  };
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type ListItemAvatarClassKey = keyof NonNullable<ListItemAvatarProps['classes']>;

/**
 * A simple wrapper to apply `List` styles to an `Avatar`.
 *
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [ListItemAvatar API](https://material-ui.com/api/list-item-avatar/)
 */
export default function ListItemAvatar(props: ListItemAvatarProps): JSX.Element;
