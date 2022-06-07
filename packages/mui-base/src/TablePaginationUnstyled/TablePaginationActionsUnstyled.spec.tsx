import * as React from 'react';
import { TablePaginationActionsUnstyled } from '@mui/base/TablePaginationUnstyled';
import {
  TablePaginationActionsUnstyledButtonSlotProps,
  TablePaginationActionsUnstyledRootSlotProps,
} from './TablePaginationActionsUnstyled.types';

function Root(props: TablePaginationActionsUnstyledRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

function Button(props: TablePaginationActionsUnstyledButtonSlotProps) {
  const { ownerState, ...other } = props;
  return <button type="button" data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

const styledTablePaginationActions = (
  <TablePaginationActionsUnstyled
    components={{
      Root,
      BackButton: Button,
      NextButton: Button,
      FirstButton: Button,
      LastButton: Button,
    }}
    count={10}
    getItemAriaLabel={() => ''}
    onPageChange={() => {}}
    page={0}
    rowsPerPage={10}
    showFirstButton
    showLastButton
  />
);
