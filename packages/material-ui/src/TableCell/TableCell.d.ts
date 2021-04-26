import * as React from 'react';
import { StandardProps } from '..';
import { Padding, Size } from '../Table';

export { Padding, Size };

/**
 * `<TableCell>` will be rendered as an `<th>`or `<td>` depending
 * on the context it is used in. Where context literally is the
 * React `context`.
 *
 * Since it is not decided via prop, we have create loose typings
 * here.
 */
export interface TableCellProps
  extends StandardProps<TableCellBaseProps, TableCellClassKey, 'align'> {
  /**
   * Set the text-align on the table cell content.
   *
   * Monetary or generally number fields **should be right aligned** as that allows
   * you to add them up quickly in your head without having to worry about decimals.
   */
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  /**
   * The table cell contents.
   */
  children?: React.ReactNode;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType<TableCellBaseProps>;
  /**
   * Sets the padding applied to the cell.
   * By default, the Table parent component set the value (`normal`).
   * `default` is deprecated, use `normal` instead.
   */
  padding?: Padding;
  /**
   * Set scope attribute.
   */
  scope?: TableCellBaseProps['scope'];
  /**
   * Specify the size of the cell.
   * By default, the Table parent component set the value (`medium`).
   */
  size?: Size;
  /**
   * Set aria-sort direction.
   */
  sortDirection?: SortDirection;
  /**
   * Specify the cell type.
   * By default, the TableHead, TableBody or TableFooter parent component set the value.
   */
  variant?: 'head' | 'body' | 'footer';
}

export type TableCellBaseProps = React.ThHTMLAttributes<HTMLTableHeaderCellElement> &
  React.TdHTMLAttributes<HTMLTableDataCellElement>;

export type SortDirection = 'asc' | 'desc' | false;

export type TableCellClassKey =
  | 'root'
  | 'head'
  | 'body'
  | 'footer'
  | 'alignLeft'
  | 'alignCenter'
  | 'alignRight'
  | 'alignJustify'
  | 'sizeSmall'
  | 'paddingCheckbox'
  | 'paddingNone'
  | 'stickyHeader';

/**
 * The component renders a `<th>` element when the parent context is a header
 * or otherwise a `<td>` element.
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [TableCell API](https://material-ui.com/api/table-cell/)
 */
export default function TableCell(props: TableCellProps): JSX.Element;
