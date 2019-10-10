import { ListItemTypeMap } from '../ListItem';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ExtendButtonBase } from '../ButtonBase';
import { Omit } from '@material-ui/types';

export type MenuItemClassKey = 'root' | 'gutters' | 'selected' | 'dense';

export type MenuItemTypeMap<P = {}, D extends React.ElementType = 'li'> = Omit<
  ListItemTypeMap<P, D>,
  'classKey'
> & {
  classKey: MenuItemClassKey;
};

declare const MenuItem: OverridableComponent<
  MenuItemTypeMap<{ button: false }, MenuItemTypeMap['component']>
> &
  ExtendButtonBase<MenuItemTypeMap<{ button?: true }, MenuItemTypeMap['component']>>;

export type MenuItemProps<
  D extends React.ElementType = MenuItemTypeMap['component'],
  P = {}
> = OverrideProps<MenuItemTypeMap<P, D>, D>;

export default MenuItem;
