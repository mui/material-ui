import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface TableSortLabelProps
  extends StandardProps<ButtonBaseProps, TableSortLabelClassKey> {
  active?: boolean;
  direction?: 'asc' | 'desc';
}

export type TableSortLabelClassKey =
  | 'root'
  | 'active'
  | 'icon'
  | 'iconDirectionDesc'
  | 'iconDirectionAsc';

declare const TableSortLabel: React.ComponentType<TableSortLabelProps>;

export default TableSortLabel;
