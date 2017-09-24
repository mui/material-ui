import * as React from 'react';
import { StyledComponent } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface TableSortLabelProps extends ButtonBaseProps {
  active?: boolean;
  direction?: 'asc' | 'desc';
}

declare const TableSortLabel: StyledComponent<TableSortLabelProps>;

export default TableSortLabel;
