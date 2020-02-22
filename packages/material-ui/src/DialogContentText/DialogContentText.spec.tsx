import * as React from 'react';
import { DialogContentText } from '@material-ui/core';

const DialogContentTextTest = () => {
  const CustomComponent: React.FC<{ prop1: string; prop2: number }> = () => <div />;
  return (
    <div>
      <DialogContentText />
      <DialogContentText classes={{ root: 'rootClass' }} />
      // $ExpectError
      <DialogContentText classes={{ body1: 'body1Class' }} />
      <DialogContentText align="inherit" color="inherit" display="block" />
      <DialogContentText align="left" color="initial" display="inline" />
      <DialogContentText align="right" color="primary" display="initial" />
      <DialogContentText align="justify" color="secondary" display="initial" />
      <DialogContentText align="inherit" color="textPrimary" />
      <DialogContentText align="inherit" color="textSecondary" />
      <DialogContentText align="inherit" color="error" />
      // $ExpectError
      <DialogContentText display="incorrectValue" />
      <DialogContentText component="a" href="url" display="block" />
      <DialogContentText component="label" htmlFor="html" display="block" />
      // $ExpectError
      <DialogContentText component="a" href="url" display="incorrectValue" />
      // $ExpectError
      <DialogContentText component="a" incorrectAttribute="url" />
      // $ExpectError
      <DialogContentText component="incorrectComponent" href="url" />
      // $ExpectError
      <DialogContentText component="div" href="url" />
      // $ExpectError
      <DialogContentText href="url" />
      <DialogContentText component={CustomComponent} prop1="1" prop2={12} />
      // $ExpectError
      <DialogContentText component={CustomComponent} prop1="1" prop2={12} id="1" />
      // $ExpectError
      <DialogContentText component={CustomComponent} prop1="1" />
      // $ExpectError
      <DialogContentText component={CustomComponent} prop1="1" prop2="12" />
    </div>
  );
};
