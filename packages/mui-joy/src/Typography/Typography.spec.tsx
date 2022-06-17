import * as React from 'react';
import Typography from '@mui/joy/Typography';

<Typography component="a" href="/">
  Text
</Typography>;

function Link(props: JSX.IntrinsicElements['a']) {
  return <a {...props} />;
}
<Typography component={Link} href="/">
  Text
</Typography>;

// @ts-expect-error href is not exist in div
<Typography component="div" href="/">
  Text
</Typography>;

<Typography color="primary" />;
<Typography color="neutral" />;
<Typography color="danger" />;
<Typography color="info" />;
<Typography color="success" />;
<Typography color="warning" />;

<Typography textColor="neutral.500" />;
