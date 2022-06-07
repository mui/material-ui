import * as React from 'react';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
import {
  TablePaginationUnstyledActionsSlotProps,
  TablePaginationUnstyledDisplayedRowsSlotProps,
  TablePaginationUnstyledMenuItemSlotProps,
  TablePaginationUnstyledRootSlotProps,
  TablePaginationUnstyledSelectLabelSlotProps,
  TablePaginationUnstyledSelectSlotProps,
  TablePaginationUnstyledSpacerSlotProps,
  TablePaginationUnstyledToolbarSlotProps,
} from './TablePaginationUnstyled.types';

function Root(props: TablePaginationUnstyledRootSlotProps) {
  const { ownerState, ...other } = props;
  return <td data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

function Select(props: TablePaginationUnstyledSelectSlotProps) {
  const { ownerState, ...other } = props;
  return <input data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

function Actions(props: TablePaginationUnstyledActionsSlotProps) {
  const { ownerState, onPageChange, getItemAriaLabel, count, page, rowsPerPage, ...other } = props;
  return <div data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

function MenuItem(props: TablePaginationUnstyledMenuItemSlotProps) {
  const { ownerState, ...other } = props;
  return <option data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

function SelectLabel(props: TablePaginationUnstyledSelectLabelSlotProps) {
  const { ownerState, ...other } = props;
  return <p data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

function DisplayedRows(props: TablePaginationUnstyledDisplayedRowsSlotProps) {
  const { ownerState, ...other } = props;
  return <p data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

function Toolbar(props: TablePaginationUnstyledToolbarSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

function Spacer(props: TablePaginationUnstyledSpacerSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

const styledTablePagination = (
  <TablePaginationUnstyled
    count={10}
    onPageChange={() => {}}
    page={0}
    rowsPerPage={10}
    components={{ Root, Actions, Select, MenuItem, SelectLabel, DisplayedRows, Toolbar, Spacer }}
  />
);
