import * as React from 'react';
import { expectType } from '@mui/types';
import { TablePagination } from '@mui/base/TablePagination';
import {
  TablePaginationActionsSlotProps,
  TablePaginationDisplayedRowsSlotProps,
  TablePaginationMenuItemSlotProps,
  TablePaginationRootSlotProps,
  TablePaginationSelectLabelSlotProps,
  TablePaginationSelectSlotProps,
  TablePaginationSpacerSlotProps,
  TablePaginationToolbarSlotProps,
} from './TablePagination.types';

function Root(props: TablePaginationRootSlotProps) {
  const { ownerState, ...other } = props;
  return <td data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

function Select(props: TablePaginationSelectSlotProps) {
  const { ownerState, ...other } = props;
  return <input data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

function Actions(props: TablePaginationActionsSlotProps) {
  const { ownerState, onPageChange, getItemAriaLabel, count, page, rowsPerPage, ...other } = props;
  return <div data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

function MenuItem(props: TablePaginationMenuItemSlotProps) {
  const { ownerState, ...other } = props;
  return <option data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

function SelectLabel(props: TablePaginationSelectLabelSlotProps) {
  const { ownerState, ...other } = props;
  return <p data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

function DisplayedRows(props: TablePaginationDisplayedRowsSlotProps) {
  const { ownerState, ...other } = props;
  return <p data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

function Toolbar(props: TablePaginationToolbarSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

function Spacer(props: TablePaginationSpacerSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

const styledTablePagination = (
  <TablePagination
    count={10}
    onPageChange={() => {}}
    page={0}
    rowsPerPage={10}
    slots={{
      root: Root,
      actions: Actions,
      select: Select,
      menuItem: MenuItem,
      selectLabel: SelectLabel,
      displayedRows: DisplayedRows,
      toolbar: Toolbar,
      spacer: Spacer,
    }}
    slotProps={{
      actions: {
        showFirstButton: true,
        showLastButton: true,
      },
    }}
  />
);

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  const requiredProps = {
    count: 10,
    getItemAriaLabel: () => '',
    onPageChange: () => {},
    page: 0,
    rowsPerPage: 10,
    showFirstButton: true,
    showLastButton: true,
  };

  return (
    <div>
      {/* @ts-expect-error */}
      <TablePagination {...requiredProps} invalidProp={0} />

      <TablePagination<'a'> {...requiredProps} slots={{ root: 'a' }} href="#" />

      <TablePagination<typeof CustomComponent>
        {...requiredProps}
        slots={{ root: CustomComponent }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <TablePagination<typeof CustomComponent>
        {...requiredProps}
        slots={{ root: CustomComponent }}
      />

      <TablePagination<'button'>
        {...requiredProps}
        slots={{ root: 'button' }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <TablePagination<'button'>
        {...requiredProps}
        slots={{ root: 'button' }}
        ref={(elem) => {
          expectType<HTMLButtonElement | null, typeof elem>(elem);
        }}
        onMouseDown={(e) => {
          expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof e>(e);
          e.currentTarget.checkValidity();
        }}
      />
    </div>
  );
};
