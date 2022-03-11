import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { PopperUnstyledProps } from '@mui/base/PopperUnstyled';
import { MenuUnstyledActions } from '@mui/base/MenuUnstyled';
import { SxProps } from '../styles/defaultTheme';

export type MenuSlot = 'root';

export type { MenuUnstyledActions } from '@mui/base/MenuUnstyled';

export interface MenuTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * A ref with imperative actions.
     * It allows to select the first or last menu item.
     */
    actions?: React.Ref<MenuUnstyledActions>;
    /**
     * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
     * or a function that returns either.
     * It's used to set the position of the popper.
     */
    anchorEl?: PopperUnstyledProps['anchorEl'];
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    listboxRef?: React.Ref<any>;
    listboxId?: string;
    /**
     * Triggered when focus leaves the menu and the menu should close.
     */
    onClose?: () => void;
    /**
     * Controls whether the menu is displayed.
     * @default false
     */
    open?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type MenuProps<
  D extends React.ElementType = MenuTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<MenuTypeMap<P, D>, D>;
