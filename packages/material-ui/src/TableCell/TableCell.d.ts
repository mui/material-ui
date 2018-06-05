import * as React from 'react';
import { StandardProps } from '..';

/**
 * `<TableCell>` will be rendered as an `<th>`or `<td>` depending
 * on the context it is used in. Where context literally is the
 * React `context`.
 *
 * Since it is not decided via prop, we have create loose typings
 * here.
 */
export interface TableCellProps<C> extends StandardProps<TableCellBaseProps<C>, TableCellClassKey> {
  component?: React.ReactType<C & TableCellBaseProps<C>>;
  numeric?: boolean;
  padding?: Padding;
  sortDirection?: SortDirection;
  type?: Type;
}

export type TableCellBaseProps<C> = React.ThHTMLAttributes<C & HTMLTableHeaderCellElement> &
  React.TdHTMLAttributes<C & HTMLTableDataCellElement>;

export type Padding = 'default' | 'checkbox' | 'dense' | 'none';

export type SortDirection = 'asc' | 'desc' | false;

export type Type = 'head' | 'body' | 'footer';

export type TableCellClassKey =
  | 'root'
  | 'head'
  | 'body'
  | 'footer'
  | 'numeric'
  | 'paddingDense'
  | 'paddingCheckbox'
  | 'paddingNone';

declare class TableCell<C> extends React.Component<C & TableCellProps<C>> {}

export default TableCell;
