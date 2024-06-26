import * as React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

import MenuButton from './MenuButton';
import ToggleColorMode from './ToggleColorMode';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';

function SideMenuMobile({ open, toggleDrawer, mode, toggleColorMode }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '70dvw',
          gap: 2,
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack direction="row" sx={{ gap: 1, alignItems: 'center', flexGrow: 1 }}>
            <Avatar
              sizes="small"
              alt="Riley Carter"
              src="/static/images/avatar/7.jpg"
              sx={{ width: 24, height: 24 }}
            />
            <Typography component="p" variant="h6">
              Riley Carter
            </Typography>
          </Stack>
          <MenuButton showBadge>
            <NotificationsRoundedIcon />
          </MenuButton>
          <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
        </Stack>
        <Divider />
        <Stack>
          <MenuContent />
          <Divider />
        </Stack>
        <Stack sx={{ p: 2 }}>
          <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />}>
            Logout
          </Button>
        </Stack>
        <CardAlert />
      </Stack>
    </Drawer>
  );
}

SideMenuMobile.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  open: PropTypes.bool,
  toggleColorMode: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideMenuMobile;
