import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { expectType } from '@mui/types';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

function AppBarTest() {
  return (
    <div>
      <AppBar />
      <AppBar elevation={4} />

      <AppBar
        component="a"
        href="test"
        onClick={(event) => {
          expectType<React.MouseEvent<HTMLAnchorElement, MouseEvent>, typeof event>(event);
        }}
      />
      <AppBar component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error missing stringProp and numberProp */}
      <AppBar component={CustomComponent} />
    </div>
  );
}
