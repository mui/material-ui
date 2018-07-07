import * as React from 'react';
import { StandardProps } from '..';

export interface TableBodyProps<C> extends StandardProps<TableBodyBaseProps<C>, TableBodyClassKey> {
  component?: React.ReactType<C & TableBodyBaseProps<C>>;
}

export type TableBodyClassKey = 'root';

export type TableBodyBaseProps<C> = React.HTMLAttributes<C & HTMLTableSectionElement>;

declare class TableBody<C> extends React.Component<C & TableBodyProps<C>> {}

export default TableBody;
