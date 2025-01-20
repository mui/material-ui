/* eslint-disable no-irregular-whitespace */
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';

export default function MuiBaseDeprecation(props: {
  newComponentName?: string;
  newComponentUrl?: string;
}) {
  if (props.newComponentUrl && props.newComponentName) {
    return (
      <Alert severity="error">
        @mui/base has been deprecated and has been replaced by Base UI. Please use the Base UI{' '}
        <Link href={props.newComponentUrl} color="error.800" underline="always">
          {props.newComponentName} component
        </Link>{' '}
        instead.
      </Alert>
    );
  }
  return (
    <Alert severity="error">
      @mui/base has been deprecated and has been replaced by{' '}
      <Link href="https://www.base-ui.com" color="error.800" underline="always">
        Base UI
      </Link>
      . We strongly advise using the new package instead.
    </Alert>
  );
}
