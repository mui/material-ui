import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function HeaderSection() {
  return (
    <Stack justifyContent="space-between" alignItems="flex-start" spacing={1}>
      <Typography level="h2">232 stays in Melbourne</Typography>
      <Typography level="body-md" color="neutral">
        Book your next stay at one of our properties.
      </Typography>
    </Stack>
  );
}
