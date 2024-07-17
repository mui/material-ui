import * as React from 'react';
import { PaletteMode } from '@mui/material';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CustomDatePicker from './CustomDatePicker';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import ToggleColorMode from './ToggleColorMode';
import MenuButton from './MenuButton';

import Search from './Search';

interface HeaderProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export default function Header({ mode, toggleColorMode }: HeaderProps) {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        <CustomDatePicker />
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ToggleColorMode
          mode={mode}
          toggleColorMode={toggleColorMode}
          data-screenshot="toggle-mode"
        />
      </Stack>
    </Stack>
  );
}
