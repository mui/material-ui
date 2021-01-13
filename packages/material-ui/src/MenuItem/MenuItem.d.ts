import { SxProps } from '@material-ui/system';
import { Theme } from '@material-ui/core/styles';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { MenuItemClasses } from './menuItemClasses';

export type MenuItemTypeMap<P = {}, D extends React.ElementType = 'li'> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * If `true`, the list item is focused during the first mount.
     * Focus will also be triggered if the value changes from false to true.
     * @default false
     */
    autoFocus?: boolean;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<MenuItemClasses>;
    /**
     * If `true`, compact vertical padding designed for keyboard and mouse input is used.
     * The prop defaults to the value inherited from the parent Menu component.
     * @default false
     */
    dense?: boolean;
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, the left and right padding is removed.
     * @default false
     */
    disableGutters?: boolean;
    /**
     * If `true`, a 1px light border is added to the bottom of the menu item.
     * @default false
     */
    divider?: boolean;
    /**
     * Use to apply selected styling.
     * @default false
     */
    selected?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    onArrowRightKeydown?: React.KeyboardEventHandler<any>;
    onKeyDown?: React.KeyboardEventHandler<any>;
    onMouseEnter?: React.MouseEventHandler<any>;
    onParentClose?: React.ReactEventHandler<{}>;
    /**
     * When `true`, opens the subMenu, if provided.
     * @default false
     */
    openSubMenu?: boolean;
    setParentOpenSubMenuIndex?: (index: number) => void;
    /**
     * Menu to display as a sub-menu.
     */
    subMenu?: React.ReactNode;
    /**
     * Normally `Icon`, `SvgIcon`, or a `@material-ui/icons`
     * SVG icon element rendered on a MenuItem that
     * contains a subMenu
     * @default KeyboardArrowRight
     */
    subMenuIcon?: React.ReactNode;
    onArrowRightKeydown?: React.KeyboardEventHandler<any>;
    onKeyDown?: React.KeyboardEventHandler<any>;
    onMouseEnter?: React.MouseEventHandler<any>;
    onParentClose?: React.ReactEventHandler<{}>;
    /**
     * When `true`, opens the subMenu, if provided.
     * @default false
     */
    openSubMenu?: boolean;
    setParentOpenSubMenuIndex?: (index: number) => void;
    /**
     * Menu to display as a sub-menu.
     */
    subMenu?: React.ReactNode;
    /**
     * Normally `Icon`, `SvgIcon`, or a `@material-ui/icons`
     * SVG icon element rendered on a MenuItem that
     * contains a subMenu
     * @default KeyboardArrowRight
     */
    subMenuIcon?: React.ReactNode;
  };
  defaultComponent: D;
}>;

/**
 *
 * Demos:
 *
 * - [Menus](https://material-ui.com/components/menus/)
 *
 * API:
 *
 * - [MenuItem API](https://material-ui.com/api/menu-item/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const MenuItem: ExtendButtonBase<MenuItemTypeMap>;

export type MenuItemProps<
  D extends React.ElementType = MenuItemTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<MenuItemTypeMap<P, D>, D>;

export default MenuItem;
