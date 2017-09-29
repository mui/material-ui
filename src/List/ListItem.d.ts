import * as React from 'react';
import { StyledComponent } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export type ListItemProps = {
  button?: boolean;
  component?: React.ReactType;
  dense?: boolean;
  disabled?: boolean;
  disableGutters?: boolean;
  divider?: boolean;
} & ButtonBaseProps &
  React.LiHTMLAttributes<HTMLLIElement>;

export type ListItemClassKey =
  | 'root'
  | 'container'
  | 'keyboardFocused'
  | 'default'
  | 'dense'
  | 'disabled'
  | 'divider'
  | 'gutters'
  | 'button'
  | 'secondaryAction'
  ;

declare const ListItem: StyledComponent<ListItemProps, ListItemClassKey>;

export default ListItem;
