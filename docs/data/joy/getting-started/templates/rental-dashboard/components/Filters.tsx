import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import IconButton from '@mui/joy/IconButton';
import CountrySelector from './CountrySelector';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import OrderSelector from './OrderSelector';

export default function Filters() {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 0, sm: 2 }}
      justifyContent={{ xs: 'space-between', md: 'auto' }}
      sx={{ maxWidth: '100%' }}
    >
      <Stack direction="row" gap={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
        <CountrySelector />
        <FormControl>
          <Input type="date" placeholder="Jan 6 - Jan 13" aria-label="Date" />
        </FormControl>
        <FormControl>
          <Input
            startDecorator="$"
            type="number"
            placeholder="Price"
            aria-label="Price"
          />
        </FormControl>
      </Stack>
      <IconButton
        variant="outlined"
        sx={{ m: 0, display: { sm: 'auto', md: 'none' } }}
      >
        <FilterAltRoundedIcon />
      </IconButton>
      <OrderSelector />
    </Stack>
  );
}
