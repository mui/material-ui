import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface TableSortLabelProps<C>
  extends StandardProps<ButtonBaseProps<C>, TableSortLabelClassKey> {
  active?: boolean;
  direction?: 'asc' | 'desc';
}

export type TableSortLabelClassKey =
  | 'root'
  | 'active'
  | 'icon'
  | 'iconDirectionDesc'
  | 'iconDirectionAsc';

declare class TableSortLabel<C> extends React.Component<C & TableSortLabelProps<C>> {}

export default TableSortLabel;
