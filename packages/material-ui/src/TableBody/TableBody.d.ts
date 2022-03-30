import * as React from 'react';
import { OverridableComponent, OverrideProps, OverridableTypeMap } from '../OverridableComponent';

export interface TableBodyTypeMap<P extends {} = {}, D extends React.ElementType = 'tbody'>
  extends OverridableTypeMap {
  props: P;
  defaultComponent: D;
  classKey: TableBodyClassKey;
}
/**
 *
 * Demos:
 *
 * - [Tables](https://mui.com/components/tables/)
 *
 * API:
 *
 * - [TableBody API](https://mui.com/api/table-body/)
 */
declare const TableBody: OverridableComponent<TableBodyTypeMap>;

export type TableBodyClassKey = 'root';

export type TableBodyProps<
  D extends React.ElementType = TableBodyTypeMap['defaultComponent'],
  P extends {} = {}
> = OverrideProps<TableBodyTypeMap<P, D>, D>;

export default TableBody;
