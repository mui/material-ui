import * as React from 'react';
import { Link } from 'remix';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function About() {
  return (
    <React.Fragment>
      <Typography variant="h4" component="h1" gutterBottom>
        Remix with TypeScript example
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Go to the main page
      </Button>
    </React.Fragment>
  );
}
