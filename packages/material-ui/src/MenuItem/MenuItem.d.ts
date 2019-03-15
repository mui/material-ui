import { ListItemTypeMap } from '../ListItem';
import { SimplifiedPropsOf } from '../OverridableComponent';
import { ExtendButtonBase } from '../ButtonBase';

export type MenuItemClassKey = 'root' | 'gutters' | 'selected';

declare const MenuItem: ExtendButtonBase<ListItemTypeMap<{ role?: string }, 'li'>>;

export type MenuItemProps = SimplifiedPropsOf<typeof MenuItem>;

export default MenuItem;
