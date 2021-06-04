import { SxProps } from '@material-ui/system';
import { Theme } from '@material-ui/core/styles';
import { DistributiveOmit } from '@material-ui/types';
import { ListItemButtonTypeMap, ListItemButtonProps } from '../ListItemButton';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { MenuItemClasses } from './menuItemClasses';

export interface MenuItemTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P &
    DistributiveOmit<ListItemButtonTypeMap<P, D>['props'], 'children' | 'classes'> & {
      /**
       * The content of the component.
       */
      children?: React.ReactNode;
      /**
       * Override or extend the styles applied to the component.
       */
      classes?: Partial<MenuItemClasses>;
      /**
       * `classes` prop applied to the [`ListItem`](/api/list-item/) element.
       * @deprecated this prop will be removed in v6, use `classes` instead
       */
      ListItemClasses?: ListItemButtonProps['classes'];
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
    };
  defaultComponent: D;
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
 * - inherits [ListItemButton API](https://material-ui.com/api/list-item-button/)
 */
declare const MenuItem: OverridableComponent<MenuItemTypeMap>;

export type MenuItemProps<
  D extends React.ElementType = MenuItemTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<MenuItemTypeMap<P, D>, D>;

export default MenuItem;
