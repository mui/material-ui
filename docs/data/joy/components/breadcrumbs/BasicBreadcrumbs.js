import * as React from 'react';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

export default function BasicBreadcrumbs() {
  return (
    <Breadcrumbs aria-label="breadcrumbs">
      {['Home', 'TV Shows', 'Futurama', 'Characters'].map((item) => (
        <Link
          // `preventDefault` is for demo purposes
          // and is generally not needed in your app
          onClick={(event) => event.preventDefault()}
          key={item}
          underline="hover"
          color="neutral"
          fontSize="inherit"
          href="/"
        >
          {item}
        </Link>
      ))}

      <Typography fontSize="inherit">Dr. Zoidberg</Typography>
    </Breadcrumbs>
  );
}
