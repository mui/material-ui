import * as React from 'react';
import { styled } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ToggleColorMode from './ToggleColorMode';
import SideNav from './SideNav';
import MenuButton from './MenuButton';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import OptionsMenu from './OptionsMenu';

interface NavBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  backdropFilter: 'blur(24px)',
  maxHeight: 40,
});

export default function Navbar({ mode, toggleColorMode }: NavBarProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={(theme) => ({
          boxShadow: 0,
          bgcolor: 'background.default',
          backgroundImage: 'none',
          borderBottom: '1px solid',
          borderColor: theme.palette.divider,
        })}
      >
        <StyledToolbar variant="regular">
          <Stack
            maxWidth="xl"
            direction="row"
            gap={1}
            alignItems="center"
            justifyContent={{ xs: 'flex-end', md: 'space-between' }}
            flexGrow={1}
          >
            <NavbarBreadcrumbs />
            <Stack
              sx={{ display: { xs: 'none', md: 'flex' } }}
              direction="row"
              gap={1}
            >
              <MenuButton showBadge>
                <NotificationsIcon />
              </MenuButton>
              <OptionsMenu />
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Stack>
            <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
              <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </MenuButton>
              <SideNav open={open} toggleDrawer={toggleDrawer} />
            </Box>
          </Stack>
        </StyledToolbar>
      </AppBar>
    </div>
  );
}
