import HomeIcon from '@mui/icons-material/Home';
import * as React from 'react';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

export default function BreadcrumbsWithIcon() {
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumbs">
      <Link
        // The `preventDefault` is for demonstration purposes, generally, you don't need it in your application
        onClick={(event) => event.preventDefault()}
        underline="hover"
        color="primary"
        fontSize="inherit"
        href="/"
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Jake
      </Link>
      {['Rosa', 'Charles'].map((item: string) => (
        <Link
          // The `preventDefault` is for demonstration purposes, generally, you don't need it in your application
          onClick={(event) => event.preventDefault()}
          key={item}
          underline="hover"
          color="primary"
          fontSize="inherit"
          href="/"
        >
          {item}
        </Link>
      ))}
      <Typography fontSize="inherit">Hitchcock</Typography>
    </Breadcrumbs>
  );
}
