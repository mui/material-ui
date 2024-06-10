import * as React from 'react';
import Stack from '@mui/material/Stack';
import CustomDatePicker from './CustomDatePicker';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';

export default function Header() {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        px: 1,
        pt: 3,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <CustomDatePicker />
    </Stack>
  );
}
