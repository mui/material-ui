import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface TableContainerTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P;
  defaultComponent: D;
  classKey: TableContainerClassKey;
}

declare const TableContainer: OverridableComponent<TableContainerTypeMap>;

export type TableContainerClassKey = 'root';

export type TableContainerProps<
  D extends React.ElementType = TableContainerTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TableContainerTypeMap<P, D>, D>;

export default TableContainer;
