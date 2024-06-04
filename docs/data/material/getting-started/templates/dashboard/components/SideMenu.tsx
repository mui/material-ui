import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

const drawerWidth = 225;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  return (
    <Drawer variant="permanent" sx={{ display: { xs: 'none', md: 'block' } }}>
      <Box sx={{ height: 64 }} />
      <Divider />
      <List>
        {[
          { text: 'Home', icon: <HomeRoundedIcon /> },
          { text: 'Analytics', icon: <AnalyticsRoundedIcon /> },
          { text: 'Clients', icon: <PeopleRoundedIcon /> },
          { text: 'Tasks', icon: <AssignmentRoundedIcon /> },
        ].map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={index === 0}
              sx={{
                minHeight: 48,
                px: 3,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          { text: 'Settings', icon: <SettingsRoundedIcon /> },
          { text: 'About', icon: <InfoRoundedIcon /> },
          { text: 'Feedback', icon: <HelpRoundedIcon /> },
        ].map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 3,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
