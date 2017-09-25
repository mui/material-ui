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

declare const ListItem: StyledComponent<ListItemProps>;

export default ListItem;
