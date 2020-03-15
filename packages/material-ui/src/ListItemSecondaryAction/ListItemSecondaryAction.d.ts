import { StandardProps } from '..';

export interface ListItemSecondaryActionProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ListItemSecondaryActionClassKey> {}

export type ListItemSecondaryActionClassKey = 'root';

/**
 * Must be used as the last child of ListItem to function properly.
 *
 * Demos:
 * - {@link https://material-ui.com/components/lists/ Lists}
 *
 * API:
 * - {@link https://material-ui.com/api/list-item-secondary-action/ ListItemSecondaryAction API}
 *
 */
declare const ListItemSecondaryAction: React.ComponentType<ListItemSecondaryActionProps>;

export default ListItemSecondaryAction;
