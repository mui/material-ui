import * as React from 'react';
import { StandardProps } from '..';
import ButtonBase, { ButtonBaseProps } from '../ButtonBase';
import { OverridableComponent, SimplifiedPropsOf, OverrideProps, AnyReactType } from '../OverridableComponent';

export interface ListItemTypeMap<P, D extends AnyReactType> {
  props: P & {
    ContainerComponent?: React.ReactType<React.HTMLAttributes<HTMLDivElement>>;
    ContainerProps?: React.HTMLAttributes<HTMLDivElement>;
    dense?: boolean;
    disabled?: boolean;
    disableGutters?: boolean;
    divider?: boolean;
    focusVisibleClassName?: string;
    selected?: boolean;
  };
  defaultComponent: D;
  classKey: ListItemClassKey;
}

declare const ListItem: OverridableComponent<ListItemTypeMap<{ button?: false }, 'li'>> & OverridableComponent<ListItemTypeMap<{ button: true }, 'button'>>;

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
