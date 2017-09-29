import * as React from 'react';
import { StyledComponent } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface TableSortLabelProps extends ButtonBaseProps {
  active?: boolean;
  direction?: 'asc' | 'desc';
}

export type TableSortLabelClassKey =
  | 'root'
  | 'active'
  | 'icon'
  | 'desc'
  | 'asc'
  ;

declare const TableSortLabel: StyledComponent<TableSortLabelProps, TableSortLabelClassKey>;

export default TableSortLabel;
