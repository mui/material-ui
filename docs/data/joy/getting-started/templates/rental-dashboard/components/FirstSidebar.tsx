import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import MuiLogo from './MuiLogo';
import { openSidebar, closeSidebar } from '../utils';
import ColorSchemeToggle from './ColorSchemeToggle';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import AssistantPhotoRoundedIcon from '@mui/icons-material/AssistantPhotoRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

export default function FirstSidebar() {
  return (
    <Sheet
      className="FirstSidebar"
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
        py: 2,
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
      <IconButton
        variant="soft"
        color="neutral"
        onClick={() => closeSidebar()}
        sx={{ display: { md: 'none' }, mt: -2, borderRadius: '50%' }}
      >
        <ArrowBackIosRoundedIcon />
      </IconButton>
      <MuiLogo />
      <List sx={{ '--ListItem-radius': '8px', '--List-gap': '12px' }}>
        <ListItem>
          <ListItemButton>
            <HomeRoundedIcon />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => openSidebar()}>
            <BarChartRoundedIcon />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => openSidebar()}>
            <LayersRoundedIcon />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => openSidebar()}>
            <CheckBoxRoundedIcon />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton selected onClick={() => openSidebar()}>
            <AssistantPhotoRoundedIcon />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => openSidebar()}>
            <GroupRoundedIcon />
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
        <ColorSchemeToggle sx={{ display: { xs: 'none', md: 'inline-flex' } }} />
        <ListItem>
          <ListItemButton>
            <SupportRoundedIcon />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <SettingsRoundedIcon />
          </ListItemButton>
        </ListItem>
      </List>
      <Avatar variant="outlined" src="/static/images/avatar/3.jpg" />
    </Sheet>
  );
}
