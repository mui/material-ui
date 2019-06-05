import { ListItemTypeMap } from '../ListItem';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ExtendButtonBase } from '../ButtonBase';

export type MenuItemClassKey = 'root' | 'gutters' | 'selected';

declare const MenuItem: OverridableComponent<ListItemTypeMap<{ button: false }, 'li'>> &
  ExtendButtonBase<ListItemTypeMap<{ button?: true }, 'li'>>;

export type MenuItemProps<D extends React.ElementType = 'li', P = {}> = OverrideProps<
  ListItemTypeMap<P, D>,
  D
>;

export default MenuItem;
