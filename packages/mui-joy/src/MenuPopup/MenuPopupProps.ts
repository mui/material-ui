import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { PopperUnstyledProps } from '@mui/base/PopperUnstyled';
import { SxProps } from '../styles/defaultTheme';

export type MenuPopupSlot = 'root';

export type { MenuUnstyledActions } from '@mui/base/MenuUnstyled';

export interface MenuPopupTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
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

export type MenuPopupProps<
  D extends React.ElementType = MenuPopupTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<MenuPopupTypeMap<P, D>, D>;
