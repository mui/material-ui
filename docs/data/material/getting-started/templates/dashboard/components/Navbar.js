import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import MuiToolbar from '@mui/material/Toolbar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ToggleColorMode from './ToggleColorMode';
import SideNav from './SideNav';
import MenuButton from './MenuButton';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import OptionsMenu from './OptionsMenu';

const Toolbar = styled(MuiToolbar)({
  maxWidth: 1538,
  width: '100%',
  padding: '16px 16px 0 16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  gap: '12px',
  flexShrink: 0,
  backdropFilter: 'blur(24px)',
  '& .MuiTabs-flexContainer': {
    gap: '8px',
    p: '8px',
    pb: 0,
  },
});

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Navbar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar
      position="fixed"
      sx={(theme) => ({
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: theme.palette.divider,
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
          }}
        >
          <NavbarBreadcrumbs />
          <Stack direction="row" sx={{ gap: 1 }}>
            <MenuButton showBadge>
              <NotificationsRoundedIcon />
            </MenuButton>
            <OptionsMenu />
            <ToggleColorMode
              data-screenshot="toggle-mode"
              mode={mode}
              toggleColorMode={toggleColorMode}
            />
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
        <Tabs value={value} onChange={handleChange} aria-label="navbar tabs">
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Analytics" {...a11yProps(1)} />
          <Tab label="Clients" {...a11yProps(2)} />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Navbar;
