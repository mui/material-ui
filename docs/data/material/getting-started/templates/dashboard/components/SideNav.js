import * as React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ContactPageRoundedIcon from '@mui/icons-material/ContactPageRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

import MenuButton from './MenuButton';
import ToggleColorMode from './ToggleColorMode';

const accountsList = [
  { label: 'Profile', icon: <AccountCircleRoundedIcon sx={{ fontSize: 20 }} /> },
  { label: 'My account', icon: <ContactPageRoundedIcon sx={{ fontSize: 20 }} /> },
];

const settingsList = [
  { label: 'Add account', icon: <AddRoundedIcon sx={{ fontSize: 20 }} /> },
  { label: 'Settings', icon: <SettingsRoundedIcon sx={{ fontSize: 20 }} /> },
];

function SideNav({ open, toggleDrawer, mode, toggleColorMode }) {
  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Stack
        sx={{
          gap: 2,
          minWidth: '80dvw',
          p: 3,
          backgroundColor: 'background.paper',
          flexGrow: 1,
        }}
      >
        <Stack direction="row" sx={{ gap: 1 }}>
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
        <Stack sx={{ gap: 2 }}>
          <Divider />
          <List>
            {accountsList.map((item, index) => (
              <ListItem key={index}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}

            {settingsList.map((item, index) => (
              <ListItem key={index}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack>
          <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />}>
            Logout
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}

SideNav.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  open: PropTypes.bool,
  toggleColorMode: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideNav;
