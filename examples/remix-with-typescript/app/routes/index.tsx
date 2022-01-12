import * as React from 'react';
import type { MetaFunction } from 'remix';
import { Link } from 'remix';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: 'Remix Starter',
    description: 'Welcome to remix!',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <Stack>
      <Typography variant="h4" component="h1" gutterBottom>
        Remix with TypeScript example
      </Typography>
      <Link to="/about" color="secondary">
        Go to the about page
      </Link>
      <Button variant="contained" component={Link} to="/404">
        Go to the 404 page (bug reproduce)
      </Button>
    </Stack>
  );
}
