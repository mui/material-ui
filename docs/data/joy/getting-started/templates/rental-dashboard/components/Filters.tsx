import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import CountrySelector from './CountrySelector';
import OrderSelector from './OrderSelector';

export default function Filters() {
  return (
    <div>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <CountrySelector />
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
        <Box sx={{ width: '30%' }}>
          <Stack direction="row" justifyContent="flex-end">
            <OrderSelector />
          </Stack>
        </Box>
      </Stack>
    </div>
  );
}
