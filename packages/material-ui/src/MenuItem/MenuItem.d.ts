import { ListItemTypeMap } from '../ListItem';
import { SimplifiedPropsOf, OverridableComponent } from '../OverridableComponent';
import { ExtendButtonBase } from '../ButtonBase';

export type MenuItemClassKey = 'root' | 'gutters' | 'selected';

declare const MenuItem: OverridableComponent<ListItemTypeMap<{ button: false }, 'li'>> &
  ExtendButtonBase<ListItemTypeMap<{ button?: true }, 'li'>>;

export type MenuItemProps = SimplifiedPropsOf<typeof MenuItem>;

export default MenuItem;
