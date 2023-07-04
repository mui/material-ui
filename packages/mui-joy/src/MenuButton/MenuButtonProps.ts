import { OverrideProps } from '@mui/types';
import {
  MenuButtonProps as BaseMenuButtonProps,
  MenuButtonOwnerState as BaseMenuButtonOwnerState,
} from '@mui/base/MenuButton';
import Button from '../Button';

export type MenuButtonSlot = 'root';

export interface MenuButtonOwnerState extends BaseMenuButtonOwnerState {}

export interface MenuButtonTypeMap<P = {}, D extends React.ElementType = typeof Button> {
  props: P & BaseMenuButtonProps;
  defaultComponent: D;
}

export type MenuButtonProps<
  D extends React.ElementType = MenuButtonTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<MenuButtonTypeMap<P, D>, D>;
