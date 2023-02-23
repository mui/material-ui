import * as React from 'react';
import Typography from '@mui/joy/Typography';

export default function NestedTypography() {
  return (
    <Typography mb={2} maxWidth={400} lineHeight="lg">
      Typography lets you create <Typography variant="soft">nested</Typography>{' '}
      typography. Use your{' '}
      <Typography variant="outlined" color="success">
        imagination
      </Typography>{' '}
      to build wonderful{' '}
      <Typography variant="solid" color="primary">
        user interface
      </Typography>
      .
    </Typography>
  );
}
