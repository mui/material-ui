import * as React from 'react';
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

      <AppBar component="a" href="test" />
      <AppBar component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error missing stringProp and numberProp */}
      <AppBar component={CustomComponent} />
    </div>
  );
}
