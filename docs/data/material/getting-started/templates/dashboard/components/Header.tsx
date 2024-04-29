import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Search from './Search';
import CustomDatePicker from './CustomDatePicker';

export default function Header() {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-start', md: 'flex-end' }}
      justifyContent="space-between"
      gap={2}
      sx={{ my: 2 }}
    >
      <Stack sx={{ maxWidth: 500 }}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Typography color="text.secondary">
          Real-time analytics to improve user engagement and guide strategy.
        </Typography>
      </Stack>
      <Stack direction="row" gap={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
        <Search />
        <CustomDatePicker />
      </Stack>
    </Stack>
  );
}
