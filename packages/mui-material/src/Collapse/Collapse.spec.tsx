import * as React from 'react';
import { expectType } from '@mui/types';
import Collapse from '@mui/material/Collapse';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

function CollapseTest() {
  return (
    <div>
      <Collapse in />
      <Collapse
        component="a"
        href="test"
        onClick={(event) => {
          expectType<React.MouseEvent<HTMLAnchorElement, MouseEvent>, typeof event>(event);
        }}
      />
      <Collapse component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error missing stringProp and numberProp */}
      <Collapse component={CustomComponent} />
    </div>
  );
}
