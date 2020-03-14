import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface TableHeadTypeMap<P = {}, D extends React.ElementType = 'thead'> {
  props: P;
  defaultComponent: D;
  classKey: TableHeadClassKey;
}

declare const TableHead: OverridableComponent<TableHeadTypeMap>;

export type TableHeadClassKey = 'root';

export type TableHeadProps<
  D extends React.ElementType = TableHeadTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TableHeadTypeMap<P, D>, D>;

export default TableHead;
