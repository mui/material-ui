import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface TableBodyTypeMap<P = {}, D extends React.ElementType = 'tbody'> {
  props: P;
  defaultComponent: D;
  classKey: TableBodyClassKey;
}

declare const TableBody: OverridableComponent<TableBodyTypeMap>;

export type TableBodyClassKey = 'root';

export type TableBodyProps<
  D extends React.ElementType = TableBodyTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TableBodyTypeMap<P, D>, D>;

export default TableBody;
