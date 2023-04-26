import * as React from 'react';
import {
  TablePaginationActions,
  TablePaginationActionsButtonSlotProps,
  TablePaginationActionsRootSlotProps,
} from '@mui/base/TablePagination';
import { expectType } from '@mui/types';

function Root(props: TablePaginationActionsRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

function Button(props: TablePaginationActionsButtonSlotProps) {
  const { ownerState, ...other } = props;
  return <button type="button" data-rows-per-page={ownerState.rowsPerPage} {...other} />;
}

const styledTablePaginationActions = (
  <TablePaginationActions
    slots={{
      root: Root,
      backButton: Button,
      nextButton: Button,
      firstButton: Button,
      lastButton: Button,
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
      <TablePaginationActions {...requiredProps} invalidProp={0} />

      <TablePaginationActions {...requiredProps} component="a" href="#" />

      <TablePaginationActions
        {...requiredProps}
        component={CustomComponent}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <TablePaginationActions {...requiredProps} component={CustomComponent} />

      <TablePaginationActions
        {...requiredProps}
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <TablePaginationActions<'button'>
        {...requiredProps}
        component="button"
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
