import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { PopperUnstyledProps } from '@mui/base/PopperUnstyled';
import { SxProps } from '../styles/defaultTheme';

export type MenuPopupSlot = 'root';

export type { MenuUnstyledActions } from '@mui/base/MenuUnstyled';

export interface MenuPopupTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    PopperUnstyledProps & {
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

export type MenuPopupProps<
  D extends React.ElementType = MenuPopupTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<MenuPopupTypeMap<P, D>, D>;
