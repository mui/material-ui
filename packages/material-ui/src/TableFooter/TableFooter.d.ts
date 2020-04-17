import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface TableFooterTypeMap<P = {}, D extends React.ElementType = 'tfoot'> {
  props: P;
  defaultComponent: D;
  classKey: TableFooterClassKey;
}
/**
 *
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [TableFooter API](https://material-ui.com/api/table-footer/)
 */
declare const TableFooter: OverridableComponent<TableFooterTypeMap>;

export type TableFooterClassKey = 'root';

export type TableFooterProps<
  D extends React.ElementType = TableFooterTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TableFooterTypeMap<P, D>, D>;

export default TableFooter;
