import * as React from 'react';
import { OverridableComponent, OverrideProps, OverridableTypeMap } from '../OverridableComponent';

export interface TableFooterTypeMap<P extends {} = {}, D extends React.ElementType = 'tfoot'>
  extends OverridableTypeMap {
  props: P;
  defaultComponent: D;
  classKey: TableFooterClassKey;
}
/**
 *
 * Demos:
 *
 * - [Tables](https://mui.com/components/tables/)
 *
 * API:
 *
 * - [TableFooter API](https://mui.com/api/table-footer/)
 */
declare const TableFooter: OverridableComponent<TableFooterTypeMap>;

export type TableFooterClassKey = 'root';

export type TableFooterProps<
  D extends React.ElementType = TableFooterTypeMap['defaultComponent'],
  P extends {} = {}
> = OverrideProps<TableFooterTypeMap<P, D>, D>;

export default TableFooter;
