import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import OptionsMenu from './OptionsMenu';
import Search from './Search';

export default function Header() {
  return (
    <Stack direction="row" alignItems="flex-end" sx={{ pb: 3 }}>
      <Stack flexGrow={1}>
        <Typography variant="h5" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography>Make data-driven decisions with analytics.</Typography>
      </Stack>
      <Stack direction="row" gap={1}>
        <Search />
        <OptionsMenu />
      </Stack>
    </Stack>
  );
}
