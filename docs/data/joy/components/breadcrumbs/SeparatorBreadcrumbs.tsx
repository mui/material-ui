import * as React from 'react';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

export default function SeparatorBreadcrumbs() {
  return (
    <Breadcrumbs separator={<KeyboardArrowLeft />} aria-label="breadcrumbs">
      <Typography fontSize="inherit">Amy</Typography>
      {['Fry', 'Leela', 'Bender', 'Linda'].map((item: string) => (
        <Link
          // The `preventDefault` is for demonstration purposes, generally, you don't need it in your application
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
