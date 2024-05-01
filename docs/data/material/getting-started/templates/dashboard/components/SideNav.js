import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';

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
import AddIcon from '@mui/icons-material/Add';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import Face4Icon from '@mui/icons-material/Face4';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import Switch from '@mui/material/Switch';

const DividerItem = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(10),
  color: theme.palette.grey[500],
  fontWeight: theme.typography.fontWeightBold,
  letterSpacing: '0.2rem',
  textTransform: 'uppercase',
  display: 'flex',
  '&:before': {
    content: '" "',
    width: '5px',
    display: 'block',
    alignSelf: 'center',
    marginRight: '8px',
    height: '5px',
    background: alpha(theme.palette.text.primary, 0.24),
    borderRadius: '20%',
  },
}));

const accountsList = [
  { label: 'Your profile', icon: <Face4Icon sx={{ fontSize: 20 }} /> },
  { label: 'Account settings', icon: <ManageAccountsIcon sx={{ fontSize: 20 }} /> },
  { label: 'Add account', icon: <AddIcon sx={{ fontSize: 20 }} /> },
];

const navigationList = [
  {
    label: 'Home',
    icon: <HomeRoundedIcon sx={{ fontSize: 20 }} />,
    props: { selected: true },
  },
  { label: 'Analytics', icon: <AnalyticsRoundedIcon sx={{ fontSize: 20 }} /> },
  { label: 'Clients', icon: <PeopleIcon sx={{ fontSize: 20 }} /> },
];

function SideNav({ open, toggleDrawer, mode, toggleColorMode }) {
  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Stack
        sx={{
          minWidth: '40dvw',
          p: 4,
          backgroundColor: 'background.paper',
          flexGrow: 1,
        }}
        justifyContent="space-between"
      >
        <Stack gap={2}>
          <Stack direction="row" gap={1} alignItems="center">
            <Avatar
              sx={(theme) => ({
                bgcolor: theme.palette.primary.main,
                width: '40px',
                height: '40px',
                fontSize: theme.typography.pxToRem(20),
                marginRight: 1,
              })}
            >
              R
            </Avatar>
            <Typography component="p" variant="h5" fontWeight={600}>
              Riley Carter
            </Typography>
          </Stack>
          <Divider />
          <Stack>
            <DividerItem> Account</DividerItem>
            <List>
              {accountsList.map((item, index) => (
                <ListItem key={index}>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Stack>
          <Divider />
          <Stack>
            <DividerItem> Navigation</DividerItem>
            <List>
              {navigationList.map((item, index) => (
                <ListItem key={index} {...(item?.props ? item.props : {})}>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Stack>
        </Stack>
        <Stack>
          <List sx={{ gap: '12px' }}>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon sx={{ fontSize: '20px' }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  mode === 'light' ? 'Turn on dark mode' : 'Turn off dark mode'
                }
              />
              <Switch
                checked={mode === 'dark'}
                onChange={toggleColorMode}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon sx={{ fontSize: '20px' }} />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="error"
            fullWidth
            startIcon={<LogoutIcon />}
          >
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
