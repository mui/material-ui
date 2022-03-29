import * as React from 'react';
import { OverridableComponent, OverrideProps, OverridableTypeMap } from '../OverridableComponent';

export interface TableContainerTypeMap<P extends {} = {}, D extends React.ElementType = 'div'>
  extends OverridableTypeMap {
  props: P;
  defaultComponent: D;
  classKey: TableContainerClassKey;
}
/**
 *
 * Demos:
 *
 * - [Tables](https://mui.com/components/tables/)
 *
 * API:
 *
 * - [TableContainer API](https://mui.com/api/table-container/)
 */
declare const TableContainer: OverridableComponent<TableContainerTypeMap>;

export type TableContainerClassKey = 'root';

export type TableContainerProps<
  D extends React.ElementType = TableContainerTypeMap['defaultComponent'],
  P extends {} = {}
> = OverrideProps<TableContainerTypeMap<P, D>, D>;

export default TableContainer;
