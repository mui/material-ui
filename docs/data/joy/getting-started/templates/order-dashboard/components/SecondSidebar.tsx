import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { closeSidebar } from '../utils';

import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import StarsIcon from '@mui/icons-material/Stars';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';

export default function SecondSidebar() {
  return (
    <React.Fragment>
      <Box
        className="SecondSidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Sheet
        className="SecondSidebar"
        color="neutral"
        variant="outlined"
        sx={{
          position: {
            xs: 'fixed',
            lg: 'sticky',
          },
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
            lg: 'none',
          },
          transition: 'transform 0.4s',
          zIndex: 9999,
          height: '100dvh',
          top: 0,
          p: 2,
          py: 3,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <List
          sx={{
            '--ListItem-radius': '6px',
            '--ListItem-minHeight': '8px',
            '--List-gap': '8px',
          }}
        >
          <ListSubheader role="presentation">Dashboard</ListSubheader>
          <ListItem>
            <ListItemButton onClick={() => closeSidebar()}>
              <ListItemDecorator>
                <BubbleChartIcon />
              </ListItemDecorator>
              <ListItemContent>Overview</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => closeSidebar()}>
              <ListItemDecorator>
                <NotificationsIcon />
              </ListItemDecorator>
              <ListItemContent>Notification</ListItemContent>
              <Chip color="warning" size="sm">
                10
              </Chip>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => closeSidebar()}>
              <ListItemDecorator>
                <InsertChartIcon />
              </ListItemDecorator>
              <ListItemContent>Analytics</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => closeSidebar()}>
              <ListItemDecorator>
                <StarsIcon />
              </ListItemDecorator>
              <ListItemContent>Saved reports</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton selected>
              <ListItemDecorator>
                <ShoppingCartIcon />
              </ListItemDecorator>
              <ListItemContent>Orders</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => closeSidebar()}>
              <ListItemDecorator>
                <AccountBoxIcon />
              </ListItemDecorator>
              <ListItemContent>User reports</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => closeSidebar()}>
              <ListItemDecorator>
                <ManageAccountsIcon />
              </ListItemDecorator>
              <ListItemContent>Manage notifications</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{ pl: 1, mt: 'auto', display: 'flex', alignItems: 'center' }}>
          <div>
            <Typography level="title-sm">Olivia Ryhe</Typography>
            <Typography level="body-sm">olivia@email.com</Typography>
          </div>
          <IconButton variant="plain" sx={{ ml: 'auto' }}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Sheet>
    </React.Fragment>
  );
}
