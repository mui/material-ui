import * as React from 'react';
import { Typography } from '@material-ui/core';

const TypographyTest = () => {
  const CustomComponent: React.FC<{ prop1: string; prop2: number }> = () => <div />;
  return (
    <div>
      <Typography />
      <Typography align="inherit" color="inherit" display="block" />
      <Typography align="left" color="initial" display="inline" />
      <Typography align="right" color="primary" display="initial" />
      <Typography align="justify" color="secondary" display="initial" />
      <Typography align="inherit" color="textPrimary" />
      <Typography align="inherit" color="textSecondary" />
      <Typography align="inherit" color="error" />
      {/* @ts-expect-error */}
      <Typography display="incorrectValue" />
      <Typography component="a" href="url" display="block" />
      <Typography component="label" htmlFor="html" display="block" />
      {/* @ts-expect-error */}
      <Typography component="a" href="url" display="incorrectValue" />
      {/* @ts-expect-error */}
      <Typography component="a" incorrectAttribute="url" />
      {/* @ts-expect-error */}
      <Typography component="incorrectComponent" href="url" />
      {/* @ts-expect-error */}
      <Typography component="div" href="url" />
      {/* @ts-expect-error */}
      <Typography href="url" />
      <Typography component={CustomComponent} prop1="1" prop2={12} />
      {/* @ts-expect-error */}
      <Typography component={CustomComponent} prop1="1" prop2={12} id="1" />
      {/* @ts-expect-error */}
      <Typography component={CustomComponent} prop1="1" />
      {/* @ts-expect-error */}
      <Typography component={CustomComponent} prop1="1" prop2="12" />
    </div>
  );
};
