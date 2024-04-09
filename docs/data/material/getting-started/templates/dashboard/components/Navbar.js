import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import ToggleColorMode from './ToggleColorMode';
import SideNav from './SideNav';
import MenuButton from './MenuButton';

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  backdropFilter: 'blur(24px)',
  maxHeight: 40,
});

function Navbar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
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
            <img
              src={
                'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
              }
              style={logoStyle}
              alt="logo of sitemark"
            />
            <Stack direction="row" gap={1.5}>
              <MenuButton>
                <SettingsIcon />
              </MenuButton>
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Stack>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <SideNav open={open} toggleDrawer={toggleDrawer} />
            </Box>
          </Stack>
        </StyledToolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Navbar;
