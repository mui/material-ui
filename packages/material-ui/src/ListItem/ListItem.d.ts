import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface ListItemProps
  extends StandardProps<
    ButtonBaseProps & React.LiHTMLAttributes<HTMLElement>,
    ListItemClassKey,
    'component'
  > {
  alignItems?: 'flex-start' | 'center';
  button?: boolean;
  component?: React.ReactType<ListItemProps>;
  ContainerComponent?: React.ReactType<React.HTMLAttributes<HTMLDivElement>>;
  ContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  dense?: boolean;
  disabled?: boolean;
  disableGutters?: boolean;
  divider?: boolean;
  focusVisibleClassName?: string;
  selected?: boolean;
}

export type ListItemClassKey =
  | 'root'
  | 'container'
  | 'focusVisible'
  | 'default'
  | 'dense'
  | 'disabled'
  | 'divider'
  | 'gutters'
  | 'button'
  | 'secondaryAction'
  | 'selected';

declare const ListItem: React.ComponentType<ListItemProps>;

export default ListItem;
