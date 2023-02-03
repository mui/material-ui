import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Sheet from '@mui/joy/Sheet';
import MuiLogo from './MuiLogo';

export default function FirstSidebar() {
  return (
    <Sheet
      variant="solid"
      color="success"
      invertedColors
      sx={{
        height: '100dvh',
        position: 'sticky',
        top: 0,
        p: 1.5,
        py: 3,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        bgcolor: 'success.600',
      }}
    >
      <AspectRatio
        ratio="1"
        variant="solid"
        sx={{
          width: 36,
          borderRadius: 'xs',
          boxShadow: (theme) => theme.shadow.md,
          '--joy-shadowChannel': (theme) => theme.vars.palette.success.darkChannel,
        }}
      >
        <div>
          <MuiLogo />
        </div>
      </AspectRatio>
      <List sx={{ '--List-item-radius': '8px', '--List-gap': '12px' }}>
        <ListItem>
          <ListItemButton>
            <i data-feather="home" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton selected variant="soft">
            <i data-feather="bar-chart-2" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <i data-feather="layers" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <i data-feather="check-square" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <i data-feather="flag" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <i data-feather="users" />
          </ListItemButton>
        </ListItem>
      </List>
      <List
        sx={{
          mt: 'auto',
          flexGrow: 0,
          '--List-item-radius': '8px',
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
      <Avatar src="/static/images/avatar/3.jpg" />
    </Sheet>
  );
}
