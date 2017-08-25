import * as React from 'react';
import { StyledComponent } from '..';

interface LabelDisplayedRowsArgs {
  from: number;
  to: number;
  count: number;
  page: number;
}

export interface TablePaginationProps {
  count: number;
  labelDisplayedRows?: (paginationInfo: LabelDisplayedRowsArgs) => Node;
  labelRowsPerPage?: Node;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onChangeRowsPerPage: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
}

export default class TablePagination extends StyledComponent<TablePaginationProps> {}
