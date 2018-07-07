import * as React from 'react';
import { StandardProps } from '..';

export interface TableProps<C = {}> extends StandardProps<TableBaseProps<C>, TableClassKey> {
  component?: React.ReactType<C & TableBaseProps<C>>;
}

export type TableBaseProps<C> = React.TableHTMLAttributes<C & HTMLTableElement>;

export type TableClassKey = 'root';

declare class Table<C> extends React.Component<C & TableProps<C>> {}

export default Table;
