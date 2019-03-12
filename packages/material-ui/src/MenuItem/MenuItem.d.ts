import { ListItemTypeMap } from '../ListItem';
import { SimplifiedPropsOf, OverridableComponent } from '../OverridableComponent';
import { ExtendButtonBaseTypeMap } from '../ButtonBase';

export type MenuItemClassKey = 'root' | 'gutters' | 'selected';

declare const MenuItem: OverridableComponent<
  ExtendButtonBaseTypeMap<ListItemTypeMap<{ role?: string }, 'li'>>
>;

export type MenuItemProps = SimplifiedPropsOf<typeof MenuItem>;

export default MenuItem;
