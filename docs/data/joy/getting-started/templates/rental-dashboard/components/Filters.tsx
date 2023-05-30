import * as React from 'react';
import { Stack, Button, FormControl, Input, Grid, Box } from '@mui/joy';
import CountrySelector from './CountrySelector';

export default function Filters() {
  return (
    <Box>
      <Grid
        spacing={1.5}
        container
        justifyContent="space-between"
        sx={{ flexGrow: 1 }}
        // direction={{ xs: 'column', md: 'row' }}
        // useFlexGap // todo: investigate this more - doesn't work now
      >
        <Grid xs={12} sm={6} md={3}>
          <CountrySelector />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <FormControl>
            <Input type="date" placeholder="Jan 6 - Jan 13" aria-label="Date" />
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <FormControl>
            <Input
              startDecorator="$"
              type="number"
              placeholder="Any price"
              aria-label="Price"
            />
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} md={3} display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            color="neutral"
            startDecorator={<i data-feather="filter" />}
          >
            More filters
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
