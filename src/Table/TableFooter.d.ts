import * as React from 'react';

export interface TableFooterProps extends TableFooterBaseProps {
  component?: React.ReactType<TableFooterBaseProps>;
}

export type TableFooterBaseProps = React.HTMLAttributes<HTMLTableSectionElement>;

declare const TableFooter: React.ComponentType<TableFooterProps>;

export default TableFooter;
