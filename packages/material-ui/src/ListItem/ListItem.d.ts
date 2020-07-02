import * as React from 'react';
import { ExtendButtonBase } from '../ButtonBase';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ListItemTypeMap<P, D extends React.ElementType> {
  props: P & {
    /**
     * Defines the `align-items` style property.
     */
    alignItems?: 'flex-start' | 'center';
    /**
     * If `true`, the list item will be focused during the first mount.
     * Focus will also be triggered if the value changes from false to true.
     */
    autoFocus?: boolean;
    /**
     * If `true`, the list item will be a button (using `ButtonBase`). Props intended
     * for `ButtonBase` can then be applied to `ListItem`.
     */
    button?: boolean;
    /**
     * The content of the component. If a `ListItemSecondaryAction` is used it must
     * be the last child.
     */
    children?: React.ReactNode;
    /**
     * The container component used when a `ListItemSecondaryAction` is the last child.
     */
    ContainerComponent?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Props applied to the container component if used.
     */
    ContainerProps?: React.HTMLAttributes<HTMLDivElement>;
    /**
     * If `true`, compact vertical padding designed for keyboard and mouse input will be used.
     */
    dense?: boolean;
    /**
     * If `true`, the list item will be disabled.
     */
    disabled?: boolean;
    /**
     * If `true`, the left and right padding is removed.
     */
    disableGutters?: boolean;
    /**
     * If `true`, a 1px light border is added to the bottom of the list item.
     */
    divider?: boolean;
    focusVisibleClassName?: string;
    /**
     * Use to apply selected styling.
     */
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
