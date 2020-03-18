import * as React from 'react';
import { ExtendButtonBase } from '../ButtonBase';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ListItemTypeMap<P, D extends React.ElementType> {
  props: P & {
    alignItems?: 'flex-start' | 'center';
    autoFocus?: boolean;
    button?: boolean;
    ContainerComponent?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
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

/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 * - [Transfer List](https://material-ui.com/components/transfer-list/)
 *
 * API:
 *
 * - [ListItem API](https://material-ui.com/api/list-item/)
 */
declare const ListItem: OverridableComponent<ListItemTypeMap<{ button?: false }, 'li'>> &
  ExtendButtonBase<ListItemTypeMap<{ button: true }, 'div'>>;

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

export type ListItemProps<D extends React.ElementType = 'li', P = {}> = OverrideProps<
  ListItemTypeMap<P, D>,
  D
>;

export default ListItem;
