import * as React from 'react';
import { StyledComponent } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export type ListItemProps = {
  button?: boolean;
  component?: React.ReactNode;
  dense?: boolean;
  disabled?: boolean;
  disableGutters?: boolean;
  divider?: boolean;
} & ButtonBaseProps &
  React.LiHTMLAttributes<HTMLLIElement>;

export default class ListItem extends StyledComponent<ListItemProps> {}
