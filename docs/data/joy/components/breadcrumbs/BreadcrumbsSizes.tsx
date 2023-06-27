import * as React from 'react';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function BreadcrumbsSizes() {
  return (
    <Stack sx={{ display: 'flex', alignItems: 'center' }}>
      <Breadcrumbs separator="—" aria-label="breadcrumbs" size="sm">
        {['Home', 'TV Shows', 'Futurama', 'Characters'].map((item: string) => (
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
      <Breadcrumbs separator="—" aria-label="breadcrumbs" size="md">
        {['Home', 'TV Shows', 'Futurama', 'Characters'].map((item: string) => (
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
      <Breadcrumbs separator="—" aria-label="breadcrumbs" size="lg">
        {['Home', 'TV Shows', 'Futurama', 'Characters'].map((item: string) => (
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
    </Stack>
  );
}
