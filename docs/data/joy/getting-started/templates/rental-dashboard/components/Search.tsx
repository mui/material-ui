import * as React from 'react';
import { Stack, Button, FormControl, Input } from '@mui/joy';

export default function Search() {
  return (
    <Stack spacing={1.5} direction="row">
      <FormControl sx={{ flex: 1 }}>
        <Input
          placeholder="Search"
          startDecorator={<i data-feather="search" />}
          aria-label="Search"
        />
      </FormControl>
      <Button variant="outlined" color="neutral">
        Clear
      </Button>
      <Button variant="solid" color="primary">
        Search
      </Button>
    </Stack>
  );
}
