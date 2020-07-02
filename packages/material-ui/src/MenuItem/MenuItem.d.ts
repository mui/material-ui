import { ListItemTypeMap, ListItemProps } from '../ListItem';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ExtendButtonBase } from '../ButtonBase';

export type MenuItemClassKey = 'root' | 'gutters' | 'selected' | 'dense';

export interface MenuItemTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P &
    ListItemTypeMap<P, D>['props'] & {
      /**
       * `classes` prop applied to the [`ListItem`](/api/list-item/) element.
       */
      ListItemClasses?: ListItemProps['classes'];
    };
  defaultComponent: D;
  classKey: MenuItemClassKey;
}

/**
 *
 * Demos:
 *
 * - [Menus](https://material-ui.com/components/menus/)
 *
 * API:
 *
 * - [MenuItem API](https://material-ui.com/api/menu-item/)
 * - inherits [ListItem API](https://material-ui.com/api/list-item/)
 */
declare const MenuItem: OverridableComponent<
  MenuItemTypeMap<{ button: false }, MenuItemTypeMap['defaultComponent']>
> &
  ExtendButtonBase<MenuItemTypeMap<{ button?: true }, MenuItemTypeMap['defaultComponent']>>;

export type MenuItemProps<
  D extends React.ElementType = MenuItemTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<MenuItemTypeMap<P, D>, D>;

export default MenuItem;
