import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import CircularProgress from '@mui/joy/CircularProgress';

export default function CircularProgressSizes() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button startDecorator={<CircularProgress variant="solid" thickness={2} />}>
        Loading…
      </Button>
      <IconButton>
        <CircularProgress thickness={2} />
      </IconButton>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link
        component="button"
        variant="outlined"
        startDecorator={
          <CircularProgress
            variant="plain"
            thickness={2}
            sx={{ '--CircularProgress-size': '16px' }}
          />
        }
        sx={{ p: 1 }}
      >
        Submitting...
      </Link>
    </Box>
  );
}
