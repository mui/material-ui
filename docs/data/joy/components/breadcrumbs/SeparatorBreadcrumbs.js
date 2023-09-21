import * as React from 'react';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

export default function SeparatorBreadcrumbs() {
  return (
    <Breadcrumbs separator={<KeyboardArrowLeft />} aria-label="breadcrumbs">
      <Typography>Amy</Typography>
      {['Characters', 'Futurama', 'TV Shows', 'Home'].map((item) => (
        <Link key={item} color="neutral" href="#separators">
          {item}
        </Link>
      ))}
    </Breadcrumbs>
  );
}
