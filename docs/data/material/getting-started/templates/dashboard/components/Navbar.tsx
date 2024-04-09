import * as React from 'react';
import { styled } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ToggleColorMode from './ToggleColorMode';
import SideNav from './SideNav';
import MenuButton from './MenuButton';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};
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
          bgcolor: theme.palette.mode === 'light' ? 'white' : 'rgba(0, 0, 0, 0.4)',
          backgroundImage: 'none',
        })}
      >
        <StyledToolbar variant="regular">
          <Stack
            maxWidth="xl"
            direction="row"
            gap={2}
            alignItems="center"
            justifyContent="space-between"
            flexGrow={1}
          >
            <Stack direction="row" gap={1} alignItems="center">
              <img
                src={
                  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                }
                style={logoStyle}
                alt="logo of sitemark"
              />
              <NavbarBreadcrumbs />
            </Stack>
            <Stack
              sx={{ display: { xs: 'none', md: 'flex' } }}
              direction="row"
              gap={1.5}
            >
              <MenuButton showBadge>
                <NotificationsIcon />
              </MenuButton>
              <MenuButton>
                <SettingsIcon />
              </MenuButton>
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
