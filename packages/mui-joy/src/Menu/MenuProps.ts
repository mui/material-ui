import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { PopperUnstyledProps } from '@mui/base/PopperUnstyled';
import { SxProps } from '../styles/defaultTheme';

export type MenuSlot = 'root';

export type { MenuUnstyledActions } from '@mui/base/MenuUnstyled';

export interface MenuTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Omit<PopperUnstyledProps, 'open'> & {
      /**
       * The unique id of the menu.
       */
      id: string;
      /**
       * If `true`, the popup is shown.
       */
      open?: boolean;
      /**
       * The menu button element for open/close the menu.
       */
      button: React.ReactElement;
      /**
       * Triggered when focus leaves the menu and the menu should close.
       */
      onClose?: () => void;
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
