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
import Stack from '@mui/material/Stack';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SelectContent from './SelectContent';
import CardAlert from './CardAlert';

const drawerWidth = 240;

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

const mainListItems = [
  { text: 'Home', icon: <HomeOutlinedIcon /> },
  { text: 'Analytics', icon: <AnalyticsOutlinedIcon /> },
  { text: 'Clients', icon: <PeopleOutlinedIcon /> },
  { text: 'Tasks', icon: <AssignmentOutlinedIcon /> },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsOutlinedIcon /> },
  { text: 'About', icon: <InfoOutlinedIcon /> },
  { text: 'Feedback', icon: <HelpOutlineOutlinedIcon /> },
];

export default function SideMenu() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Box
        sx={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          px: 1.5,
        }}
      >
        <SelectContent />
      </Box>
      <Divider />
      <Stack justifyContent="space-between" sx={{ flexGrow: 1 }}>
        <div>
          <List dense>
            {mainListItems.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                <ListItemButton selected={index === 0}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List dense>
            {secondaryListItems.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
        <CardAlert />
      </Stack>
    </Drawer>
  );
}
