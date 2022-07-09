import * as React from 'react';
import { OverridableComponent, OverridableTypeMap, OverrideProps } from '@mui/types';
import { ButtonProps } from '../Button';

export type MenuButtonSlot = 'root';

export interface MenuButtonTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    ButtonProps & {
      children:
        | string
        | ((params: {
            ref: React.Ref<HTMLButtonElement>;
            onClick: React.MouseEventHandler<HTMLButtonElement>;
            onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
          }) => React.ReactElement)
        | React.ReactElement;
      menuId?: string;
      popup: React.ReactElement;
    };
  defaultComponent: D;
}

export interface ExtendMenuButtonTypeMap<M extends OverridableTypeMap> {
  props: M['props'] & MenuButtonTypeMap['props'];
  defaultComponent: M['defaultComponent'];
}

export type MenuButtonProps<
  D extends React.ElementType = MenuButtonTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<MenuButtonTypeMap<P, D>, D>;

export type ExtendMenuButton<M extends OverridableTypeMap> = ((
  props: OverrideProps<ExtendMenuButtonTypeMap<M>, 'a'>,
) => JSX.Element) &
  OverridableComponent<ExtendMenuButtonTypeMap<M>>;
