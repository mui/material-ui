import * as React from 'react';
import { styled } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import MuiToolbar from '@mui/material/Toolbar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ToggleColorMode from './ToggleColorMode';
import SideNav from './SideNav';
import MenuButton from './MenuButton';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import OptionsMenu from './OptionsMenu';
import Search from './Search';

interface NavBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const Toolbar = styled(MuiToolbar)({
  width: '100%',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  gap: '12px',
  flexShrink: 0,
  '& .MuiTabs-flexContainer': {
    gap: '8px',
    p: '8px',
    pb: 0,
  },
});

export default function Navbar({ mode, toggleColorMode }: NavBarProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={(theme) => ({
        boxShadow: 0,
        bgcolor: 'background.default',
        backgroundImage: 'none',
        alignItems: 'center',
        outline: '1px solid',
        outlineColor: theme.palette.divider,
        zIndex: theme.zIndex.drawer - 1,
        left: { xs: 0, md: 240 },
        width: { xs: '100dvw', md: `calc(100% - 240px)` },
        maxHeight: 64,
      })}
    >
      <Toolbar variant="regular">
        <Stack
          direction="row"
          sx={{
            gap: 1,
            alignItems: 'center',
            justifyContent: { xs: 'flex-end', md: 'space-between' },
            flexGrow: 1,
            width: '100%',
            display: { xs: 'none', md: 'flex' },
            maxWidth: { sm: '100%', md: '1500px' },
          }}
        >
          <NavbarBreadcrumbs />
          <Stack direction="row" sx={{ gap: 1 }}>
            <Search />
            <MenuButton showBadge aria-label="Open notifications">
              <NotificationsRoundedIcon />
            </MenuButton>
            <OptionsMenu />
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexGrow: 1,
            width: '100%',
            display: { sm: 'flex', md: 'none' },
          }}
        >
          <NavbarBreadcrumbs />
          <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuRoundedIcon />
          </MenuButton>
          <SideNav
            open={open}
            toggleDrawer={toggleDrawer}
            mode={mode}
            toggleColorMode={toggleColorMode}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
