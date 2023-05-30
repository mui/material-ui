import * as React from 'react';
import { Stack } from '@mui/joy';
import ToggleGroup from './ToggleGroup';

export default function Toggles() {
  return (
    <Stack spacing={1.5} direction="row" justifyContent="space-between" pt={2}>
      <ToggleGroup
        options={[
          { label: 'Sort by date', value: 'date' },
          { label: 'Sort by price', value: 'price' },
        ]}
      />
      <ToggleGroup
        options={[
          { label: <i data-feather="list" />, value: 'list' },
          { label: <i data-feather="map-pin" />, value: 'map' },
        ]}
      />
    </Stack>
  );
}
