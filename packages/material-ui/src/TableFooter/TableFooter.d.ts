import * as React from 'react';
import { StandardProps } from '..';

export interface TableFooterProps<C>
  extends StandardProps<TableFooterBaseProps<C>, TableFooterClassKey> {
  component?: React.ReactType<C & TableFooterBaseProps<C>>;
}

export type TableFooterClassKey = 'root';

export type TableFooterBaseProps<C> = React.HTMLAttributes<C & HTMLTableSectionElement>;

declare class TableFooter<C> extends React.Component<C & TableFooterProps<C>> {}

export default TableFooter;
