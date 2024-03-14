/* eslint-disable no-restricted-imports */
import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverrideProps } from '@mui/types';
import { SlotComponentProps, MenuActions } from '@mui/base';
import { InternalStandardProps as StandardProps } from '@mui/material';
import Paper from '@mui/material/Paper';
import Popover, { PopoverProps } from '@mui/material/Popover';
import { MenuListProps } from '@mui/material/MenuList';
import { Theme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions/transition';
import { MenuClasses } from './menuClasses';

export interface MenuTypeMap<AdditionalProps = {}, RootComponent extends React.ElementType = 'ul'> {
  props: AdditionalProps &
    StandardProps<Omit<PopoverProps, 'slots' | 'slotProps' | 'open' | 'onClose'>, 'children'> & {
      /**
       * A ref with imperative actions that can be performed on the menu.
       */
      actions?: React.Ref<MenuActions>;
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
       * Props applied to the [`MenuList`](/material-ui/api/menu-list/) element.
       * @default {}
       */
      MenuListProps?: Partial<MenuListProps>;
      /**
       * Callback fired when the component requests to be closed.
       *
       * @param {object} event The event source of the callback.
       * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
       */
      onClose?: {
        bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown' | 'tabKeyDown'): void;
      }['bivarianceHack'];
      /**
       * If `true`, the component is shown.
       */
      open?: boolean;
      /**
       * `classes` prop applied to the [`Popover`](/material-ui/api/popover/) element.
       */
      PopoverClasses?: PopoverProps['classes'];
      /**
       * The components used for each slot inside.
       *
       * @default {}
       */
      slots?: {
        root?: React.ElementType;
        listbox?: React.ElementType;
        paper?: React.ElementType;
      };
      /**
       * The extra props for the slot components.
       * You can override the existing props or add new ones.
       *
       * @default {}
       */
      slotProps?: {
        root?: SlotComponentProps<typeof Popover, {}, MenuOwnerState>;
        listbox?: SlotComponentProps<'ul', {}, MenuOwnerState>;
        paper?: SlotComponentProps<typeof Paper, {}, {}>;
      };
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
       * @default {}
       */
      TransitionProps?: TransitionProps;
      /**
       * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
       * @default 'selectedMenu'
       */
      variant?: 'menu' | 'selectedMenu';
    };
  defaultComponent: RootComponent;
}

export type MenuProps<
  RootComponent extends React.ElementType = MenuTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<MenuTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export interface MenuOwnerState extends Omit<MenuProps, 'open'> {
  open: boolean;
}
