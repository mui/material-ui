import * as React from 'react';
import { Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';

const categories = [
  {
    id: 'Develop',
    children: [
      {
        id: 'Authentication',
        icon: <PeopleIcon />,
        active: true,
      },
      { id: 'Database', icon: <DnsRoundedIcon /> },
      { id: 'Storage', icon: <PermMediaOutlinedIcon /> },
      { id: 'Hosting', icon: <PublicIcon /> },
      { id: 'Functions', icon: <SettingsEthernetIcon /> },
      {
        id: 'ML Kit',
        icon: <SettingsInputComponentIcon />,
      },
    ],
  },
  {
    id: 'Quality',
    children: [
      { id: 'Analytics', icon: <SettingsIcon /> },
      { id: 'Performance', icon: <TimerIcon /> },
      { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
    ],
  },
];

const item = {
  py: 1,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  bgcolor: '#232f3e',
  boxShadow: '0 -1px 0 #404854 inset',
  py: 2,
};

const firebase = {
  fontSize: 24,
  color: (theme: Theme) => theme.palette.common.white,
};

function Navigator(props: DrawerProps) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, ...firebase }}>Paperbase</ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon sx={{ minWidth: 'auto', mr: 2 }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Project Overview</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem sx={{ py: 2 }}>
              <ListItemText sx={{ color: 'common.white' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem
                key={childId}
                button
                sx={{ ...item, ...(active && { color: '#4fc3f7' }) }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', mr: 2 }}>{icon}</ListItemIcon>
                <ListItemText>{childId}</ListItemText>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

export default Navigator;
