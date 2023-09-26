import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import CountrySelector from './CountrySelector';
import OrderSelector from './OrderSelector';
import IconButton from '@mui/joy/IconButton';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';

export default function Filters() {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 0, sm: 2 }}
      justifyContent={{ xs: 'space-between', sm: 'auto' }}
    >
      <Stack direction="row" gap={2} sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <CountrySelector sx={{ flexGrow: 1, width: 800 }} />
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
        sx={{ m: 0, display: { xs: 'auto', sm: 'none' } }}
      >
        <FilterAltRoundedIcon />
      </IconButton>

      <OrderSelector />
    </Stack>
  );
}
