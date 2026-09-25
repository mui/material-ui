import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';

export default function AccountMenu2() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <Typography sx={{ minWidth: 100 }}>Contact</Typography>
      <Typography sx={{ minWidth: 100 }}>Profile</Typography>
      <Menu2
        align="end"
        sideOffset={4}
        trigger={
          <Tooltip title="Account settings">
            <IconButton size="small" sx={{ ml: 2 }}>
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        }
        slotProps={{
          paper: {
            sx: {
              '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 },
            },
          },
        }}
      >
        <Menu2Item>
          <Avatar /> Profile
        </Menu2Item>
        <Menu2Item>
          <Avatar /> My account
        </Menu2Item>
        <Menu2Separator />
        <Menu2Item>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </Menu2Item>
        <Menu2Item>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </Menu2Item>
        <Menu2Item>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </Menu2Item>
      </Menu2>
    </Box>
  );
}
