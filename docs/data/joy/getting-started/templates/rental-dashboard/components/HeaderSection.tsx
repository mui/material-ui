import * as React from 'react';
import { Box, Button, Divider, Typography } from '@mui/joy';

export default function HeaderSection() {
  return (
    <div>
      <div>
        <Typography level="h1" fontSize="xl4">
          232 stays in Melbourne
        </Typography>
        <Typography level="body1" color="neutral">
          Book your next stay at one of our properties.
        </Typography>
      </div>
      <Box sx={{ flex: 999 }} />
      <Box sx={{ display: 'flex', gap: 1, '& > *': { flexGrow: 1 } }}>
        <Button variant="outlined" color="neutral">
          Shared
        </Button>
        <Button
          variant="solid"
          color="primary"
          startDecorator={<i data-feather="star" />}
        >
          Save search
        </Button>
      </Box>
      <Divider />
    </div>
  );
}
