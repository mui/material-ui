import * as React from 'react';
import { DialogContentText } from '@material-ui/core';

const DialogContentTextTest = () => {
  const CustomComponent: React.FC<{ prop1: string; prop2: number }> = () => <div />;
  return (
    <div>
      <DialogContentText />
      <DialogContentText classes={{ root: 'rootClass' }} />
      {/* @ts-expect-error */}
      <DialogContentText classes={{ body1: 'body1Class' }} />
      <DialogContentText align="inherit" color="inherit" display="block" />
      <DialogContentText align="left" color="initial" display="inline" />
      <DialogContentText align="right" color="primary" display="initial" />
      <DialogContentText align="justify" color="secondary" display="initial" />
      <DialogContentText align="inherit" color="textPrimary" />
      <DialogContentText align="inherit" color="textSecondary" />
      <DialogContentText align="inherit" color="error" />
      {/* @ts-expect-error */}
      <DialogContentText display="incorrectValue" />
      <DialogContentText component="a" href="url" display="block" />
      <DialogContentText component="label" htmlFor="html" display="block" />
      {/* @ts-expect-error */}
      <DialogContentText component="a" href="url" display="incorrectValue" />
      {/* @ts-expect-error */}
      <DialogContentText component="a" incorrectAttribute="url" />
      {/* @ts-expect-error */}
      <DialogContentText component="incorrectComponent" href="url" />
      {/* @ts-expect-error */}
      <DialogContentText component="div" href="url" />
      {/* @ts-expect-error */}
      <DialogContentText href="url" />
      <DialogContentText component={CustomComponent} prop1="1" prop2={12} />
      {/* @ts-expect-error */}
      <DialogContentText component={CustomComponent} prop1="1" prop2={12} id="1" />
      {/* @ts-expect-error */}
      <DialogContentText component={CustomComponent} prop1="1" />
      {/* @ts-expect-error */}
      <DialogContentText component={CustomComponent} prop1="1" prop2="12" />
    </div>
  );
};
