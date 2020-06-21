import * as React from 'react';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { SvgIconProps } from '../SvgIcon';
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
  classKey: TableSortLabelClassKey;
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

export type TableSortLabelClassKey =
  | 'root'
  | 'active'
  | 'icon'
  | 'iconDirectionDesc'
  | 'iconDirectionAsc';

export type TableSortLabelProps<
  D extends React.ElementType = TableSortLabelTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TableSortLabelTypeMap<P, D>, D>;

export default TableSortLabel;
