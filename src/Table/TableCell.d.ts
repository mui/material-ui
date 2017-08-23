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
  checkbox?: boolean;
  compact?: boolean;
  disablePadding?: boolean;
  numeric?: boolean;
} & React.ThHTMLAttributes<HTMLTableHeaderCellElement> &
  React.TdHTMLAttributes<HTMLTableDataCellElement>;

export default class TableCell extends StyledComponent<TableCellProps> {}
