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
     * @default false
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
      root?: string;
      active?: string;
      icon?: string;
      iconDirectionDesc?: string;
      iconDirectionAsc?: string;
    };
    /**
     * The current sort direction.
     * @default 'asc'
     */
    direction?: 'asc' | 'desc';
    /**
     * Hide sort icon when active is false.
     * @default false
     */
    hideSortIcon?: boolean;
    /**
     * Sort icon to use.
     * @default ArrowDownwardIcon
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
