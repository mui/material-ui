import { ListItemTypeMap } from '../ListItem';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ExtendButtonBase } from '../ButtonBase';
import { Omit } from '@material-ui/types';

export type MenuItemClassKey = 'root' | 'gutters' | 'selected';

export type MenuItemTypeMap<P, D extends React.ElementType> = Omit<
  ListItemTypeMap<P, D>,
  'classKey'
> & {
  classKey: MenuItemClassKey;
};

declare const MenuItem: OverridableComponent<MenuItemTypeMap<{ button: false }, 'li'>> &
  ExtendButtonBase<MenuItemTypeMap<{ button?: true }, 'li'>>;

export type MenuItemProps<D extends React.ElementType = 'li', P = {}> = OverrideProps<
  MenuItemTypeMap<P, D>,
  D
>;

export default MenuItem;
