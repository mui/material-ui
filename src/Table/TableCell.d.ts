import * as React from 'react';
import { StyledComponent } from '..';

/**
 * `<TableCell>` will be rendered as an `<th>`or `<td>` depending
 * on the context it is used in. Where context literally is the
 * React `context`.
 *
 * Since it is not decided via prop, we have create loose typings
 * here.
 */
export type TableCellProps = {
  padding?: Padding;
  numeric?: boolean;
} & React.ThHTMLAttributes<HTMLTableHeaderCellElement> &
  React.TdHTMLAttributes<HTMLTableDataCellElement>;

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

declare const TableCell: StyledComponent<TableCellProps, TableCellClassKey>;

export default TableCell;
