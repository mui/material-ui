import PublicIcon from '@mui/icons-material/Public';
import * as React from 'react';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

export default function BreadcrumbsWithIcon() {
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumbs">
      <Link
        // `preventDefault` is for demo purposes
        // and is generally not needed in your app
        onClick={(event) => event.preventDefault()}
        underline="hover"
        color="primary"
        fontSize="inherit"
        href="/"
      >
        <PublicIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        United States
      </Link>
      {['Springfield', 'Simpson'].map((item) => (
        <Link
          // `preventDefault` is for demo purposes
          // and is generally not needed in your app
          onClick={(event) => event.preventDefault()}
          key={item}
          underline="hover"
          color="success"
          fontSize="inherit"
          href="/"
        >
          {item}
        </Link>
      ))}

      <Typography fontSize="inherit">Homer</Typography>
    </Breadcrumbs>
  );
}
