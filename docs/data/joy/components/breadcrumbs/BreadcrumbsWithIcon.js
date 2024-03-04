import PublicIcon from '@mui/icons-material/Public';
import * as React from 'react';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

export default function BreadcrumbsWithIcon() {
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumbs">
      <Link color="primary" href="/">
        <PublicIcon sx={{ mr: 0.5 }} />
        United States
      </Link>
      {['Springfield', 'Simpson'].map((item) => (
        <Link key={item} color="success" href="#usage-with-link-and-typography">
          {item}
        </Link>
      ))}

      <Typography>Homer</Typography>
    </Breadcrumbs>
  );
}
