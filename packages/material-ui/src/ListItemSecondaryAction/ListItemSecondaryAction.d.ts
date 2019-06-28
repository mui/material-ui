import { StandardProps } from '..';

export interface ListItemSecondaryActionProps
  extends StandardProps<{}, ListItemSecondaryActionClassKey> {
  children: React.ReactElement;
}

export type ListItemSecondaryActionClassKey = 'root';

declare const ListItemSecondaryAction: React.ComponentType<ListItemSecondaryActionProps>;

export default ListItemSecondaryAction;
