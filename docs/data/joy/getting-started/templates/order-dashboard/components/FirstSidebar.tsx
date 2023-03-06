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

export default function FirstSidebar() {
  return (
    <Sheet
      className="FirstSidebar"
      variant="soft"
      color="primary"
      invertedColors
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
        borderRight: '1px solid',
        borderColor: 'divider',
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
      <List sx={{ '--ListItem-radius': '8px', '--List-gap': '12px' }}>
        <ListItem>
          <ListItemButton>
            <i data-feather="home" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            selected
            variant="solid"
            color="primary"
            onClick={() => openSidebar()}
          >
            <i data-feather="bar-chart-2" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => openSidebar()}>
            <i data-feather="layers" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => openSidebar()}>
            <i data-feather="check-square" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => openSidebar()}>
            <i data-feather="flag" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => openSidebar()}>
            <i data-feather="users" />
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
            <i data-feather="life-buoy" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <i data-feather="settings" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Avatar variant="outlined" src="/static/images/avatar/3.jpg" />
    </Sheet>
  );
}
