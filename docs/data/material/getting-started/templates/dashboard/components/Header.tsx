import * as React from 'react';
import Stack from '@mui/material/Stack';
import CustomDatePicker from './CustomDatePicker';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';

export default function Header() {
  return (
    <Stack
      direction="row"
      sx={{
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        pt: 3,
        maxWidth: { sm: '100%', md: '1700px' },
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <CustomDatePicker />
    </Stack>
  );
}
