import { StandardProps } from '..';

export interface ListItemIconProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ListItemIconClassKey> {
  children: React.ReactElement;
}

export type ListItemIconClassKey = 'root';

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 *
 * API:
 *
 * - [ListItemIcon API](https://material-ui.com/api/list-item-icon/)
 */
declare const ListItemIcon: React.ComponentType<ListItemIconProps>;

export default ListItemIcon;
