import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';

const CustomComponent: React.FC<{ prop1: string; prop2: number }> = function CustomComponent() {
  return <div />;
};

const InputLabelTest = () => {
  return (
    <div>
      <InputLabel />
      <InputLabel component="legend" />

      {/* @ts-expect-error */}
      <InputLabel component="a" incorrectAttribute="url" />
      {/* @ts-expect-error */}
      <InputLabel component="div" href="url" />
      <InputLabel component={CustomComponent} prop1="1" prop2={12} />
      {/* @ts-expect-error */}
      <InputLabel component={CustomComponent} prop1="1" />
      {/* @ts-expect-error */}
      <InputLabel component={CustomComponent} prop1="1" prop2="12" />
    </div>
  );
};
