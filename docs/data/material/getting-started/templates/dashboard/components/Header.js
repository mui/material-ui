import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import OptionsMenu from './OptionsMenu';
import Search from './Search';
import CustomDatePicker from './CustomDatePicker';

export default function Header() {
  return (
    <Stack direction="row" alignItems="flex-end" sx={{ pb: 3 }}>
      <Stack flexGrow={1}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography>
          Explore real-time analytics and trends on user behavior to enhance
          engagement and drive strategic decisions.
        </Typography>
      </Stack>
      <Stack direction="row" gap={1}>
        <Search />
        <CustomDatePicker />
        <OptionsMenu />
      </Stack>
    </Stack>
  );
}
