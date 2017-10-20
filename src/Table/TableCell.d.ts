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
export interface TableCellProps extends StandardProps<
  React.ThHTMLAttributes<HTMLTableHeaderCellElement> & React.TdHTMLAttributes<HTMLTableDataCellElement>,
  TableCellClassKey
> {
  padding?: Padding;
  numeric?: boolean;
}

export type Padding =
  | 'default'
  | 'checkbox'
  | 'dense'
  | 'none'
  ;

export type TableCellClassKey =
  | 'root'
  | 'numeric'
  | 'head'
  | 'paddingDefault'
  | 'paddingCompact'
  | 'paddingCheckbox'
  | 'footer'
  ;

declare const TableCell: React.ComponentType<TableCellProps>;

export default TableCell;
