import * as React from 'react';
import {
  TablePaginationActionsUnstyled,
  TablePaginationActionsUnstyledButtonSlotProps,
  TablePaginationActionsUnstyledRootSlotProps,
} from '@mui/base/TablePaginationUnstyled';
import { expectType } from '@mui/types';

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

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

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
      <TablePaginationActionsUnstyled {...requiredProps} invalidProp={0} />

      <TablePaginationActionsUnstyled {...requiredProps} component="a" href="#" />

      <TablePaginationActionsUnstyled
        {...requiredProps}
        component={CustomComponent}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <TablePaginationActionsUnstyled {...requiredProps} component={CustomComponent} />

      <TablePaginationActionsUnstyled
        {...requiredProps}
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <TablePaginationActionsUnstyled<'button'>
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
