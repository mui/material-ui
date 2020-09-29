import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
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
export interface TableCellProps extends StandardProps<TableCellBaseProps, 'align'> {
  /**
   * Set the text-align on the table cell content.
   *
   * Monetary or generally number fields **should be right aligned** as that allows
   * you to add them up quickly in your head without having to worry about decimals.
   * @default 'inherit'
   */
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  /**
   * The table cell contents.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `variant="head"` or `context.table.head`. */
    head?: string;
    /** Styles applied to the root element if `variant="body"` or `context.table.body`. */
    body?: string;
    /** Styles applied to the root element if `variant="footer"` or `context.table.footer`. */
    footer?: string;
    /** Styles applied to the root element if `size="small"`. */
    sizeSmall?: string;
    /** Styles applied to the root element if `padding="checkbox"`. */
    paddingCheckbox?: string;
    /** Styles applied to the root element if `padding="none"`. */
    paddingNone?: string;
    /** Styles applied to the root element if `align="left"`. */
    alignLeft?: string;
    /** Styles applied to the root element if `align="center"`. */
    alignCenter?: string;
    /** Styles applied to the root element if `align="right"`. */
    alignRight?: string;
    /** Styles applied to the root element if `align="justify"`. */
    alignJustify?: string;
    /** Styles applied to the root element if `context.table.stickyHeader={true}`. */
    stickyHeader?: string;
  };
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType<TableCellBaseProps>;
  /**
   * Sets the padding applied to the cell.
   * The prop defaults to the value (`'default'`) inherited from the parent Table component.
   */
  padding?: Padding;
  /**
   * Set scope attribute.
   */
  scope?: TableCellBaseProps['scope'];
  /**
   * Specify the size of the cell.
   * The prop defaults to the value (`'medium'`) inherited from the parent Table component.
   */
  size?: Size;
  /**
   * Set aria-sort direction.
   */
  sortDirection?: SortDirection;
  /**
   * Specify the cell type.
   * The prop defaults to the value inherited from the parent TableHead, TableBody, or TableFooter components.
   */
  variant?: 'head' | 'body' | 'footer';
}

export type TableCellBaseProps = React.ThHTMLAttributes<HTMLTableHeaderCellElement> &
  React.TdHTMLAttributes<HTMLTableDataCellElement>;

export type SortDirection = 'asc' | 'desc' | false;

export type TableCellClassKey = keyof NonNullable<TableCellProps['classes']>;

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
