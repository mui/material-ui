import * as React from 'react';
import { StandardProps, Replace } from '..';
import { ButtonBaseProps, ButtonBaseClassKey } from '../ButtonBase';

export interface ListItemProps extends StandardProps<
  Replace<ButtonBaseProps, React.LiHTMLAttributes<HTMLLIElement>>,
  ListItemClassKey
> {
  button?: boolean;
  component?: React.ReactType;
  dense?: boolean;
  disabled?: boolean;
  disableGutters?: boolean;
  divider?: boolean;
}

export type ListItemClassKey =
  | ButtonBaseClassKey
  | 'container'
  | 'keyboardFocused'
  | 'default'
  | 'dense'
  | 'divider'
  | 'gutters'
  | 'button'
  | 'secondaryAction'
  ;

declare const ListItem: React.ComponentType<ListItemProps>;

export default ListItem;
