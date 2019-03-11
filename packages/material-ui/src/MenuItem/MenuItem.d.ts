import { ListItemTypeMap } from '../ListItem';
import { SimplifiedPropsOf, OverridableComponent } from '../OverridableComponent';

export type MenuItemClassKey = 'root' | 'gutters' | 'selected';

declare const MenuItem: OverridableComponent<ListItemTypeMap<{ role?: string }, 'li'>>;

export type MenuItemProps = SimplifiedPropsOf<typeof MenuItem>;

export default MenuItem;
