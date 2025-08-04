import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { MenuItemClasses } from './menuItemClasses';

export interface MenuItemOwnProps {
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
   * If `true`, the component is selected.
   * @default false
   */
  selected?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type MenuItemTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'li',
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & MenuItemOwnProps;
  defaultComponent: RootComponent;
}>;

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [MenuItem API](https://mui.com/material-ui/api/menu-item/)
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 */
declare const MenuItem: ExtendButtonBase<MenuItemTypeMap>;

export type MenuItemProps<
  RootComponent extends React.ElementType = MenuItemTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<MenuItemTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default MenuItem;
