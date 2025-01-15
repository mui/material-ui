import * as React from 'react';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';

export default function MuiBaseDeprecation(props: {
  newComponentName?: string;
  newComponentUrl?: string;
}) {
  if (props.newComponentUrl && props.newComponentName) {
    return (
      <Alert severity="warning">
        <code>@mui/base</code> has been deprecated, please use the new Base UI{' '}
        <Link href={props.newComponentUrl}>{props.newComponentName} Component</Link> instead.
      </Alert>
    );
  }
  // console.log(props);
  return (
    <Alert severity="warning">
      <code>@mui/base</code> has been deprecated, if you&apos;re looking for an unstyled React
      component library try out <Link href="https://www.base-ui.com">Base UI</Link>
    </Alert>
  );
}
