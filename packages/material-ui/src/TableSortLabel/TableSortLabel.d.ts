import * as React from 'react';
import { ExtendButtonBase } from '../ButtonBase';
import { SvgIconProps } from '../SvgIcon';
import { SimplifiedPropsOf } from '../OverridableComponent';

declare const TableSortLabel: ExtendButtonBase<{
  props: {
    active?: boolean;
    direction?: 'asc' | 'desc';
    hideSortIcon?: boolean;
    IconComponent?: React.ComponentType<SvgIconProps>;
  };
  defaultComponent: 'span';
  classKey: TableSortLabelClassKey;
}>;

export type TableSortLabelClassKey =
  | 'root'
  | 'active'
  | 'icon'
  | 'iconDirectionDesc'
  | 'iconDirectionAsc';

export type TableSortLabelProps = SimplifiedPropsOf<typeof TableSortLabel>;

export default TableSortLabel;
