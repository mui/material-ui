import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function HeaderSection() {
  return (
    <Stack sx={{ mb: 2 }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', width: '100%' }}>
        <Typography level="h2">Rental properties</Typography>
      </Stack>
      <Typography level="body-md" color="neutral">
        Book your next stay at one of our properties.
      </Typography>
    </Stack>
  );
}
