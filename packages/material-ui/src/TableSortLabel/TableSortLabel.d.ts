import * as React from 'react';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { SvgIconProps } from '../SvgIcon';
import { OverrideProps } from '../OverridableComponent';

export type TableSortLabelTypeMap<
  P = {},
  D extends React.ElementType = 'span'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    active?: boolean;
    direction?: 'asc' | 'desc';
    hideSortIcon?: boolean;
    IconComponent?: React.ComponentType<{ className: string }>;
  };
  defaultComponent: D;
  classKey: TableSortLabelClassKey;
}>;

/**
 * A button based label for placing inside `TableCell` for column sorting.
 *
 * Demos:
 * - {@link https://material-ui.com/components/tables/ Tables}
 *
 * API:
 * - {@link https://material-ui.com/api/table-sort-label/ TableSortLabel API}
 * - inherits {@link https://material-ui.com/api/button-base/ ButtonBase API}
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
