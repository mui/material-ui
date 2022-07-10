import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { PopperUnstyledProps } from '@mui/base/PopperUnstyled';
import { MenuUnstyledActions } from '@mui/base/MenuUnstyled';
import { SheetProps } from '../Sheet';
import { ListProps } from '../List';

export type MenuSlot = 'root' | 'listbox';

export type { MenuUnstyledActions } from '@mui/base/MenuUnstyled';

export interface MenuTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    PopperUnstyledProps &
    SheetProps & {
      /**
       * A ref with imperative actions.
       * It allows to select the first or last menu item.
       */
      actions?: React.Ref<MenuUnstyledActions>;
      componentsProps?: {
        root?: React.ComponentPropsWithRef<'div'>;
        listbox?: ListProps;
      };
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
    };
  defaultComponent: D;
}

export type MenuProps<
  D extends React.ElementType = MenuTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<MenuTypeMap<P, D>, D>;
