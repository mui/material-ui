import { StandardProps } from '..';

export interface ListItemIconProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ListItemIconClassKey> {
  children: React.ReactElement;
  secondaryTextEnabled?: boolean;
}

export type ListItemIconClassKey = 'root';

declare const ListItemIcon: React.ComponentType<ListItemIconProps>;

export default ListItemIcon;
