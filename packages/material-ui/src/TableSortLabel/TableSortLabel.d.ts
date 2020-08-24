import * as React from 'react';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';

export type TableSortLabelTypeMap<
  P = {},
  D extends React.ElementType = 'span'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * If `true`, the label will have the active styling (should be true for the sorted column).
     */
    active?: boolean;
    /**
     * Label contents, the arrow will be appended automatically.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Pseudo-class applied to the root element if `active={true}`. */
      active?: string;
      /** Styles applied to the icon component. */
      icon?: string;
      /** Styles applied to the icon component if `direction="desc"`. */
      iconDirectionDesc?: string;
      /** Styles applied to the icon component if `direction="asc"`. */
      iconDirectionAsc?: string;
    };
    /**
     * The current sort direction.
     */
    direction?: 'asc' | 'desc';
    /**
     * Hide sort icon when active is false.
     */
    hideSortIcon?: boolean;
    /**
     * Sort icon to use.
     */
    IconComponent?: React.ComponentType<{ className: string }>;
  };
  defaultComponent: D;
}>;

/**
 * A button based label for placing inside `TableCell` for column sorting.
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [TableSortLabel API](https://material-ui.com/api/table-sort-label/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const TableSortLabel: ExtendButtonBase<TableSortLabelTypeMap>;

export type TableSortLabelClassKey = keyof NonNullable<TableSortLabelTypeMap['props']['classes']>;

export type TableSortLabelProps<
  D extends React.ElementType = TableSortLabelTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TableSortLabelTypeMap<P, D>, D>;

export default TableSortLabel;
