import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Sheet from '@mui/joy/Sheet';
import MuiLogo from './MuiLogo';
import { openSidebar } from '../utils';

import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import FlagIcon from '@mui/icons-material/Flag';
import PeopleIcon from '@mui/icons-material/People';
import SupportIcon from '@mui/icons-material/Support';
import SettingsIcon from '@mui/icons-material/Settings';

export default function FirstSidebar() {
  return (
    <Sheet
      className="FirstSidebar"
      variant="plain"
      color="neutral"
      sx={{
        position: {
          xs: 'fixed',
          md: 'sticky',
        },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--FirstSidebar-width)',
        top: 0,
        p: 1.5,
        py: 3,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <GlobalStyles
        styles={{
          ':root': {
            '--FirstSidebar-width': '68px',
          },
        }}
      />
      <MuiLogo />
      <List sx={{ '--ListItem-radius': '6px', '--List-gap': '8px' }}>
        <ListItem>
          <ListItemButton>
            <HomeIcon />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton selected variant="soft" onClick={() => openSidebar()}>
            <BarChartIcon />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => openSidebar()}>
            <LayersIcon />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => openSidebar()}>
            <AssignmentTurnedInIcon />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => openSidebar()}>
            <FlagIcon />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => openSidebar()}>
            <PeopleIcon />
          </ListItemButton>
        </ListItem>
      </List>
      <List
        sx={{
          mt: 'auto',
          flexGrow: 0,
          '--ListItem-radius': '8px',
          '--List-gap': '8px',
        }}
      >
        <ListItem>
          <ListItemButton>
            <SupportIcon />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <SettingsIcon />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Avatar variant="outlined" size="sm" src="/static/images/avatar/3.jpg" />
    </Sheet>
  );
}
