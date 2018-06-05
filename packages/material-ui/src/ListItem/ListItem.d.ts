import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface ListItemProps<C = {}>
  extends StandardProps<
    ButtonBaseProps<C> & React.LiHTMLAttributes<HTMLElement>,
    ListItemClassKey,
    'component'
  > {
  button?: boolean;
  component?: React.ReactType<C>;
  ContainerComponent?: React.ReactType<React.HTMLAttributes<HTMLDivElement>>;
  ContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  dense?: boolean;
  disabled?: boolean;
  disableGutters?: boolean;
  divider?: boolean;
  focusVisibleClassName?: string;
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
  | 'secondaryAction';

declare class ListItem<C> extends React.Component<C & ListItemProps<C>> {}

export default ListItem;
