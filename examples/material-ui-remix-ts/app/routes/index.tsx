import * as React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link as RemixLink } from '@remix-run/react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

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
    <React.Fragment>
      <Typography variant="h4" component="h1" gutterBottom>
        Material UI Remix in TypeScript example
      </Typography>
      <Link to="/about" color="secondary" component={RemixLink}>
        Go to the about page
      </Link>
    </React.Fragment>
  );
}
