import * as React from 'react';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

export default function SeparatorBreadcrumbs() {
  return (
    <Breadcrumbs separator={<KeyboardArrowLeft />} aria-label="breadcrumbs">
      <Typography fontSize="inherit">Amy</Typography>
      {['Characters', 'Futurama', 'TV Shows', 'Home'].map((item) => (
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
    </Breadcrumbs>
  );
}
