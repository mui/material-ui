import * as React from 'react';
import Paper from '@mui/material/Paper';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

function PaperTest() {
  return (
    <div>
      <Paper elevation={4} />
      <Paper component="a" href="test" />

      <Paper component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <Paper component={CustomComponent} />
    </div>
  );
}
