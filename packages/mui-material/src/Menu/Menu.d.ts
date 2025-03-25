import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps } from '..';
import { PaperProps } from '../Paper';
import { PopoverProps } from '../Popover';
import { MenuListProps } from '../MenuList';
import { ModalProps } from '../Modal';
import { BackdropProps } from '../Backdrop';
import { Theme } from '../styles';
import { TransitionProps } from '../transitions/transition';
import { MenuClasses } from './menuClasses';
import { CreateSlotsAndSlotProps, SlotComponentProps, SlotProps } from '../utils/types';

export interface MenuRootSlotPropsOverrides {}

export interface MenuPaperSlotPropsOverrides {}

export interface MenuTransitionSlotPropsOverrides {}

export interface MenuListSlotPropsOverrides {}

export interface MenuBackdropSlotPropsOverrides {}

export interface MenuSlots {
  /**
   * The component used for the popper.
   * @default Modal
   */
  root: React.ElementType;
  /**
   * The component used for the paper.
   * @default Paper
   */
  paper: React.ElementType;
  /**
   * The component used for the list.
   * @default MenuList
   */
  list: React.ElementType;
  /**
   * The component used for the transition slot.
   * @default Grow
   */
  transition: React.ElementType;
  /**
   * The component used for the backdrop slot.
   * @default Backdrop
   */
  backdrop: React.ElementType;
}

export type MenuSlotsAndSlotProps = CreateSlotsAndSlotProps<
  MenuSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the avaible props are based on the [Popover](https://mui.com/material-ui/api/popover/#props) component.
     */
    root: SlotProps<React.ElementType<ModalProps>, MenuRootSlotPropsOverrides, MenuOwnerState>;
    /**
     * Props forwarded to the paper slot.
     * By default, the avaible props are based on the [Paper](https://mui.com/material-ui/api/paper/#props) component.
     */
    paper: SlotProps<React.ElementType<PaperProps>, MenuPaperSlotPropsOverrides, MenuOwnerState>;
    /**
     * Props forwarded to the list slot.
     * By default, the avaible props are based on the [MenuList](https://mui.com/material-ui/api/menu-list/#props) component.
     */
    list: SlotProps<React.ElementType<MenuListProps>, MenuListSlotPropsOverrides, MenuOwnerState>;
    /**
     * Props forwarded to the transition slot.
     * By default, the avaible props are based on the [Grow](https://mui.com/material-ui/api/grow/#props) component.
     */
    transition: SlotComponentProps<
      // use SlotComponentProps because transition slot does not support `component` and `sx` prop
      React.ElementType,
      TransitionProps & MenuTransitionSlotPropsOverrides,
      MenuOwnerState
    >;
    /**
     * Props forwarded to the backdrop slot.
     * By default, the avaible props are based on the [Backdrop](https://mui.com/material-ui/api/backdrop/#props) component.
     */
    backdrop: SlotProps<
      React.ElementType<BackdropProps>,
      MenuBackdropSlotPropsOverrides,
      MenuOwnerState
    >;
  }
>;

export interface MenuProps
  extends StandardProps<Omit<PopoverProps, 'slots' | 'slotProps'>>,
    MenuSlotsAndSlotProps {
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl?: PopoverProps['anchorEl'];
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus?: boolean;
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<MenuClasses>;
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem?: boolean;
  /**
   * Props applied to the [`MenuList`](https://mui.com/material-ui/api/menu-list/) element.
   * @deprecated use the `slotProps.list` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {}
   */
  MenuListProps?: Partial<MenuListProps>;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose?: PopoverProps['onClose'];
  /**
   * If `true`, the component is shown.
   */
  open: boolean;
  /**
   * `classes` prop applied to the [`Popover`](https://mui.com/material-ui/api/popover/) element.
   */
  PopoverClasses?: PopoverProps['classes'];
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The length of the transition in `ms`, or 'auto'
   * @default 'auto'
   */
  transitionDuration?: TransitionProps['timeout'] | 'auto';
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @deprecated use the `slotProps.transition` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {}
   */
  TransitionProps?: TransitionProps;
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant?: 'menu' | 'selectedMenu';
}

export interface MenuOwnerState extends Omit<MenuProps, 'slots' | 'slotProps'> {}

export declare const MenuPaper: React.FC<PaperProps>;

/**
 *
 * Demos:
 *
 * - [App Bar](https://v6.mui.com/material-ui/react-app-bar/)
 * - [Menu](https://v6.mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [Menu API](https://v6.mui.com/material-ui/api/menu/)
 * - inherits [Popover API](https://v6.mui.com/material-ui/api/popover/)
 */
export default function Menu(props: MenuProps): React.JSX.Element;
