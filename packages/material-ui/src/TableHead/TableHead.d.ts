import * as React from 'react';
import { OverridableComponent, OverrideProps, OverridableTypeMap } from '../OverridableComponent';

export interface TableHeadTypeMap<P extends {} = {}, D extends React.ElementType = 'thead'>
  extends OverridableTypeMap {
  props: P;
  defaultComponent: D;
  classKey: TableHeadClassKey;
}
/**
 *
 * Demos:
 *
 * - [Tables](https://mui.com/components/tables/)
 *
 * API:
 *
 * - [TableHead API](https://mui.com/api/table-head/)
 */
declare const TableHead: OverridableComponent<TableHeadTypeMap>;

export type TableHeadClassKey = 'root';

export type TableHeadProps<
  D extends React.ElementType = TableHeadTypeMap['defaultComponent'],
  P extends {} = {}
> = OverrideProps<TableHeadTypeMap<P, D>, D>;

export default TableHead;
