import * as React from 'react';
import { Stack } from '@mui/joy';
import ToggleGroup from './ToggleGroup';
import ViewStreamRoundedIcon from '@mui/icons-material/ViewStreamRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';

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
          { label: <ViewStreamRoundedIcon />, value: 'list' },
          { label: <MapRoundedIcon />, value: 'map' },
        ]}
      />
    </Stack>
  );
}
