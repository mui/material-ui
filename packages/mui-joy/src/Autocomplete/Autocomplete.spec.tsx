import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';

const top100Films = [{ title: 'The Shawshank Redemption', year: 1994 }];

<Autocomplete options={[]} slotProps={{ listbox: { disablePortal: true } }} />;

<Autocomplete multiple placeholder="Favorites" options={[]} defaultValue={['a', 'b']} />;

<Autocomplete
  placeholder="Favorites"
  limitTags={2}
  options={top100Films}
  getOptionLabel={(option) => option.title}
  defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
  multiple
  sx={{ width: '500px' }}
/>;

<Autocomplete
  options={top100Films}
  slotProps={{
    clearIndicator: {
      color: 'danger',
      variant: 'outlined',
      size: 'sm',
    },
    popupIndicator: (ownerState) => ({
      color: ownerState.inputFocused ? 'danger' : 'neutral',
      variant: 'outlined',
      size: 'sm',
    }),
    listbox: {
      color: 'danger',
      variant: 'outlined',
      size: 'sm',
    },
    option: {
      color: 'danger',
      variant: 'outlined',
    },
  }}
/>;
