import { StandardProps } from '..';

export interface ListItemSecondaryActionProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ListItemSecondaryActionClassKey> {
  /**
   * The content of the component, normally an `IconButton` or selection control.
   */
  children?: React.ReactNode;
}

export type ListItemSecondaryActionClassKey = 'root';

/**
 * Must be used as the last child of ListItem to function properly.
 * Demos:
 *
 * - [Lists](https://mui.com/components/lists/)
 *
 * API:
 *
 * - [ListItemSecondaryAction API](https://mui.com/api/list-item-secondary-action/)
 */
export default function ListItemSecondaryAction(props: ListItemSecondaryActionProps): JSX.Element;
