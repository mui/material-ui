import * as React from 'react';
import { expectType } from '@mui/types';
import TableCell from '@mui/material/TableCell';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

function TableCellTest() {
  return (
    <div>
      <TableCell colSpan={2} rowSpan={2} scope="col" />
      <TableCell
        component="a"
        href="test"
        onClick={(event) => {
          expectType<React.MouseEvent<HTMLAnchorElement, MouseEvent>, typeof event>(event);
        }}
      />
      <TableCell component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error missing stringProp and numberProp */}
      <TableCell component={CustomComponent} />
    </div>
  );
}
