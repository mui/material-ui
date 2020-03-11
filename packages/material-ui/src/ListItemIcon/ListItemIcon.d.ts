import { StandardProps } from '..';

export interface ListItemIconProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ListItemIconClassKey> {
  children: React.ReactElement;
}

export type ListItemIconClassKey = 'root';

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 *
 * Demos:
 * - {@link https://material-ui.com/components/lists Lists}
 *
 * API:
 * - {@link https://material-ui.com/api/ListItemIcon ListItemIcon API}
 *
 */
declare const ListItemIcon: React.ComponentType<ListItemIconProps>;

export default ListItemIcon;
