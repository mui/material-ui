import * as React from 'react';
import { expectType } from '@mui/types';
import AppBar from '@mui/material/AppBar';

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

// `color`
<AppBar color="inherit" />;
<AppBar color="primary" />;
<AppBar color="secondary" />;
<AppBar color="default" />;
<AppBar color="transparent" />;
<AppBar color="error" />;
<AppBar color="success" />;
<AppBar color="info" />;
<AppBar color="warning" />;
