import { MenuProps } from '@mui/material/Menu';

export type SubMenuProps = Omit<MenuProps, 'open'>;

/**
 *
 * Demos:
 *
 * - [Menus](https://mui.com/components/menus/)
 *
 * API:
 *
 * - [SubMenu API](https://mui.com/api/sub-menu/)
 */
export default function SubMenu(props: SubMenuProps): JSX.Element;
