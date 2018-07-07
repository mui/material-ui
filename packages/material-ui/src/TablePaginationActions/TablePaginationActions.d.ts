import * as React from 'react';
import { StandardProps } from '..';
import { IconButtonProps } from '../IconButton/IconButton';

export interface TablePaginationActionsProps<C> extends React.HTMLAttributes<HTMLDivElement> {
  backIconButtonProps?: Partial<C & IconButtonProps<C>>;
  count: number;
  nextIconButtonProps?: Partial<C & IconButtonProps<C>>;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  page: number;
  rowsPerPage: number;
}

declare class TablePaginationActions<C> extends React.Component<TablePaginationActionsProps<C>> {}

export default TablePaginationActions;
