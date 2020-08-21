import { InternalStandardProps as StandardProps } from '..';

export interface ListItemSecondaryActionProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component, normally an `IconButton` or selection control.
   */
  children?: React.ReactNode;
  /**
   * See [CSS API](#css) below for more details.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element when the parent `ListItem` has `disableGutters={true}`. */
    disableGutters?: string;
  };
}

export type ListItemSecondaryActionClassKey = 'root';

/**
 * Must be used as the last child of ListItem to function properly.
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [ListItemSecondaryAction API](https://material-ui.com/api/list-item-secondary-action/)
 */
export default function ListItemSecondaryAction(props: ListItemSecondaryActionProps): JSX.Element;
