import * as React from 'react';
import { Box, Button, Divider, Stack, Typography } from '@mui/joy';

export default function HeaderSection() {
  return (
    <Stack
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      justifyContent="space-between"
      alignItems="flex-start"
      spacing={2}
    >
      <div>
        <Typography
          level="h1"
          // fontSize="xl4"
          fontSize={{
            xs: 'xl2',
            md: 'xl4',
          }}
        >
          232 stays in Melbourne
        </Typography>
        <Typography level="body1" color="neutral">
          Book your next stay at one of our properties.
        </Typography>
      </div>

      <Stack direction="row" spacing={1.5}>
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
      </Stack>
      {/* <Divider /> */}
    </Stack>
  );
}
