import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Menu from '@mui/material/Unstable_Menu2';
import MenuPopup from '@mui/material/Unstable_Menu2Popup';
import MenuTrigger from '@mui/material/Unstable_Menu2Trigger';
import MenuItem from '@mui/material/Unstable_Menu2Item';
import MenuSeparator from '@mui/material/Unstable_Menu2Separator';

export default function AccountMenu2() {
  // @focus-start @padding 1
  const triggerId = React.useId();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <Typography sx={{ minWidth: 100 }}>Contact</Typography>
      <Typography sx={{ minWidth: 100 }}>Profile</Typography>
      <Menu>
        <MenuTrigger
          render={
            <Tooltip title="Account settings">
              <IconButton id={triggerId} size="small" sx={{ ml: 2 }}>
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
          }
        />
        <MenuPopup
          align="end"
          sideOffset={4}
          sx={{
            '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 },
          }}
        >
          <MenuItem startAdornment={<Avatar />}>Profile</MenuItem>
          <MenuItem startAdornment={<Avatar />}>My account</MenuItem>
          <MenuSeparator />
          <MenuItem startAdornment={<PersonAdd fontSize="small" />}>
            Add another account
          </MenuItem>
          <MenuItem startAdornment={<Settings fontSize="small" />}>
            Settings
          </MenuItem>
          <MenuItem startAdornment={<Logout fontSize="small" />}>Logout</MenuItem>
        </MenuPopup>
      </Menu>
    </Box>
  );
  // @focus-end
}
