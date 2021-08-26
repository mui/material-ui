import { MenuProps } from '@material-ui/core/Menu';

export type SubMenuProps = Omit<MenuProps, 'open'>;

/**
 *
 * Demos:
 *
 * - [Menus](https://material-ui.com/components/menus/)
 *
 * API:
 *
 * - [SubMenu API](https://material-ui.com/api/sub-menu/)
 */
export default function SubMenu(props: SubMenuProps): JSX.Element;
