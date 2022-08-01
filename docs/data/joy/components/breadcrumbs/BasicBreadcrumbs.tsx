import HomeIcon from '@mui/icons-material/Home';
import * as React from 'react';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';

export default function BasicBreadcrumbs() {
  return (
    <div
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Breadcrumbs separator="›">
        {['Fry', 'Leela', 'Bender', 'Linda'].map((item: string) => (
          <Link underline="hover" color="neutral" fontSize="inherit" href="/">
            {item}
          </Link>
        ))}
        <Typography fontSize="inherit">Amy</Typography>
      </Breadcrumbs>
      <Sheet variant="outlined" color="info">
        <Breadcrumbs separator="›">
          <Link underline="hover" color="info" fontSize="inherit" href="/">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Peter
          </Link>
          {['Lois', 'Chris', 'Cleveland'].map((item: string) => (
            <Link underline="hover" color="neutral" fontSize="inherit" href="/">
              {item}
            </Link>
          ))}
          <Typography fontSize="inherit">Quagmire</Typography>
        </Breadcrumbs>
      </Sheet>
      <Breadcrumbs separator="›">
        <Link underline="hover" color="primary" fontSize="inherit" href="/">
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Jake
        </Link>
        {['Rosa', 'Charles'].map((item: string) => (
          <Link underline="hover" color="primary" fontSize="inherit" href="/">
            {item}
          </Link>
        ))}
        <Typography fontSize="inherit">Hitchcock</Typography>
      </Breadcrumbs>
    </div>
  );
}
