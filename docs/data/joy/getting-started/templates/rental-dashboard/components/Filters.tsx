import * as React from 'react';
import { Stack, Button, FormControl, Input } from '@mui/joy';
import CountrySelector from './CountrySelector';

export default function Filters() {
  return (
    <Stack
      spacing={1.5}
      direction={{ xs: 'column', md: 'row' }}
      useFlexGap // todo: investigate this more - doesn't work now
    >
      <div>
        <CountrySelector />
      </div>

      <FormControl>
        <Input type="date" placeholder="Jan 6 - Jan 13" aria-label="Date" />
      </FormControl>

      <FormControl>
        <Input
          startDecorator="$"
          type="number"
          placeholder="Any price"
          aria-label="Price"
        />
      </FormControl>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<i data-feather="filter" />}
      >
        More filters
      </Button>
    </Stack>
  );
}
