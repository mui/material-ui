import * as React from 'react';
import { MuiComponent, PropsOf, StandardProps } from '..';
import ButtonBase, { ButtonBaseProps } from '../ButtonBase';

declare const ListItem: MuiComponent<{
  outerProps: {
    button?: boolean;
    ContainerComponent?: React.ReactType<React.HTMLAttributes<HTMLDivElement>>;
    ContainerProps?: React.HTMLAttributes<HTMLDivElement>;
    dense?: boolean;
    disabled?: boolean;
    disableGutters?: boolean;
    divider?: boolean;
    focusVisibleClassName?: string;
  },
  defaultComponent: typeof ButtonBase;
  classKey: ListItemClassKey;
}>;

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

export type ListItemProps = PropsOf<typeof ListItem>;

export default ListItem;
