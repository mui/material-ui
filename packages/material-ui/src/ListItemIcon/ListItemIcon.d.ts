import { StandardProps } from '..';

export interface ListItemIconProps extends StandardProps<{}, ListItemIconClassKey> {
  children: React.ReactElement<any>;
}

export type ListItemIconClassKey = 'root';

declare const ListItemIcon: React.ComponentType<ListItemIconProps>;

export default ListItemIcon;
