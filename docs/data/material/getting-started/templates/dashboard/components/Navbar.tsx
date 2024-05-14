import * as React from 'react';
import { styled } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
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
          bgcolor: 'background.paper',
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
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            <NavbarBreadcrumbs />
            <Stack direction="row" gap={1}>
              <MenuButton showBadge>
                <NotificationsRoundedIcon />
              </MenuButton>
              <OptionsMenu />
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Stack>
          </Stack>
          <Stack
            maxWidth="xl"
            direction="row"
            justifyContent="space-between"
            flexGrow={1}
            alignItems="center"
            sx={{ display: { sm: 'flex', md: 'none' } }}
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
        </StyledToolbar>
      </AppBar>
    </div>
  );
}
