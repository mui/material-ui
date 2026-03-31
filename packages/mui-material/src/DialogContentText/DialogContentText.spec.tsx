import * as React from 'react';
import { DialogContentText } from '@mui/material';

const dialogContentTextTest = () => {
  const CustomComponent: React.FC<{ prop1: string; prop2: number }> = function CustomComponent() {
    return <div />;
  };
  return (
    <div>
      <DialogContentText />
      <DialogContentText classes={{ root: 'rootClass' }} />
      {/* @ts-expect-error */}
      <DialogContentText classes={{ body1: 'body1Class' }} />
      <DialogContentText align="inherit" sx={{ color: 'inherit' }} />
      <DialogContentText align="left" sx={{ color: 'initial' }} />
      <DialogContentText align="right" color="primary" sx={{ display: 'initial' }} />
      <DialogContentText align="justify" color="secondary" sx={{ display: 'initial' }} />
      <DialogContentText align="inherit" sx={{ color: 'text.primary' }} />
      <DialogContentText align="inherit" color="textSecondary" />
      <DialogContentText align="inherit" color="error" />
      <DialogContentText sx={{ display: 'block' }} />
      <DialogContentText component="a" href="url" sx={{ display: 'block' }} />
      <DialogContentText component="label" htmlFor="html" sx={{ display: 'block' }} />
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
