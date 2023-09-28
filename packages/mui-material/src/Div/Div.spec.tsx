import * as React from 'react';
import { expectType } from '@mui/types';
import Div from '@mui/material/Div';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

function DivTest() {
  return (
    <div>
      <Div />
      <Div
        onClick={(event) => {
          expectType<React.MouseEvent<HTMLDivElement, MouseEvent>, typeof event>(event);
        }}
      />
      <Div
        component="a"
        href="test"
        onClick={(event) => {
          expectType<React.MouseEvent<HTMLAnchorElement, MouseEvent>, typeof event>(event);
        }}
      />
      <Div component="a" href="test" />

      <Div component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error missing stringProp and numberProp */}
      <Div component={CustomComponent} />
    </div>
  );
}
