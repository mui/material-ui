import * as React from 'react';
import { StandardProps } from '..';

export interface TableHeadProps<C> extends StandardProps<TableHeadBaseProps<C>, TableHeadClassKey> {
  component?: React.ReactType<C & TableHeadBaseProps<C>>;
}

export type TableHeadClassKey = 'root';

export type TableHeadBaseProps<C> = React.HTMLAttributes<C & HTMLTableSectionElement>;

declare class TableHead<C> extends React.Component<C & TableHeadProps<C>> {}

export default TableHead;
