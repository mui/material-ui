import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import CircularProgress from '@mui/joy/CircularProgress';

export default function CircularProgressButton() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button startDecorator={<CircularProgress variant="solid" />}>Loading…</Button>
      <IconButton>
        <CircularProgress />
      </IconButton>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link
        component="button"
        variant="plain"
        startDecorator={<CircularProgress />}
        sx={{ p: 1 }}
      >
        Submitting...
      </Link>
    </Box>
  );
}
