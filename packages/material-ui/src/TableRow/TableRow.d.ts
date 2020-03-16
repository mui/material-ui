import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface TableRowTypeMap<P = {}, D extends React.ElementType = 'tr'> {
  props: P & {
    hover?: boolean;
    selected?: boolean;
  };
  defaultComponent: D;
  classKey: TableRowClassKey;
}

declare const TableRow: OverridableComponent<TableRowTypeMap>;

export type TableRowClassKey = 'root' | 'selected' | 'hover' | 'head' | 'footer';

export type TableRowProps<
  D extends React.ElementType = TableRowTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TableRowTypeMap<P, D>, D>;

export default TableRow;
