import * as React from 'react';
import Typography from '@mui/joy/Typography';

export default function NestedTypography() {
  return (
    <Typography
      sx={{
        maxWidth: 400,
      }}
    >
      Typography lets you create<Typography variant="soft">nested</Typography>{' '}
      typography. Use your{' '}
      <Typography
        variant="outlined"
        sx={{
          color: 'success',
        }}
      >
        imagination
      </Typography>{' '}
      to build wonderful{' '}
      <Typography
        variant="solid"
        sx={{
          color: 'primary',
        }}
        noWrap
      >
        user interface
      </Typography>
      .
    </Typography>
  );
}
