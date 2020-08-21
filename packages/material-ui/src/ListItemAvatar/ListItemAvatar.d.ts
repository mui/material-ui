import { InternalStandardProps as StandardProps } from '..';

export interface ListItemAvatarProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component – normally `Avatar`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`. */
    alignItemsFlexStart?: string;
  };
}

export type ListItemAvatarClassKey = 'root' | 'icon';

/**
 * A simple wrapper to apply `List` styles to an `Avatar`.
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [ListItemAvatar API](https://material-ui.com/api/list-item-avatar/)
 */
export default function ListItemAvatar(props: ListItemAvatarProps): JSX.Element;
