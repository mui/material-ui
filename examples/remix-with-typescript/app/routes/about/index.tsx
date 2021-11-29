import * as React from 'react';
import { Link } from 'remix';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Posts() {
  return (
    <div>
      <h1>About</h1>
      <Typography>This is the about page</Typography>
      <Button component={Link} to="/" variant="contained">
        Go back to Home
      </Button>
    </div>
  );
}
