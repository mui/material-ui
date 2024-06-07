import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';

import ToggleColorMode from './ToggleColorMode';
import SideNav from './SideNav';
import MenuButton from './MenuButton';
import OptionsMenu from './OptionsMenu';
import Search from './Search';

const Toolbar = styled(MuiToolbar)({
  width: '100%',
  padding: '12px',
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

function Navbar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
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
          <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
            <CustomIcon />
            <Typography variant="h5" component="h1" color="text.primary">
              Dashboard
            </Typography>
          </Stack>

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
          <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
            <CustomIcon />
            <Typography variant="h4" component="h1" color="text.primary">
              Dashboard
            </Typography>
          </Stack>
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

Navbar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Navbar;

export function CustomIcon() {
  return (
    <Box
      sx={{
        width: '1.5rem',
        height: '1.5rem',
        bgcolor: 'black',
        borderRadius: '999px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage:
          'linear-gradient(135deg, hsl(210, 98%, 60%) 0%, hsl(210, 100%, 35%) 100%)',
        color: 'hsla(210, 100%, 95%, 0.9)',
        border: '1px solid',
        borderColor: 'hsl(210, 100%, 55%)',
        boxShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.3)',
      }}
    >
      <DashboardRoundedIcon color="inherit" sx={{ width: '1rem' }} />
    </Box>
  );
}
