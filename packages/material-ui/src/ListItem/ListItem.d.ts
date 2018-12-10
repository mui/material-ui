import * as React from 'react';
import { StandardProps } from '..';
import ButtonBase, { ButtonBaseProps } from '../ButtonBase';
import { OverridableComponent, SimplifiedPropsOf } from '../OverridableComponent';

declare const ListItem: OverridableComponent<{
  outerProps: {
    button?: boolean;
    ContainerComponent?: React.ReactType<React.HTMLAttributes<HTMLDivElement>>;
    ContainerProps?: React.HTMLAttributes<HTMLDivElement>;
    dense?: boolean;
    disabled?: boolean;
    disableGutters?: boolean;
    divider?: boolean;
    focusVisibleClassName?: string;
    selected?: boolean;
  };
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
  | 'secondaryAction'
  | 'selected';

export type ListItemProps = SimplifiedPropsOf<typeof ListItem>;

export default ListItem;
