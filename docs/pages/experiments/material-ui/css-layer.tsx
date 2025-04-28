import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  experimental_nestedCssLayer: true,
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          [`& .${listItemIconClasses.root}`]: {
            minWidth: 0,
            color: 'blue',
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: 'red',
        },
      },
    },
  },
});

export default function CssLayer() {
  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ width: 320, maxWidth: '100%' }}>
        <MenuList>
          <MenuItem>
            <ListItemIcon
              sx={{
                minWidth: '40px',
                '&:hover': { color: 'red' },
                border: { xs: '1px solid', md: '2px solid' },
              }}
            >
              any
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ⌘X
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>any</ListItemIcon>
            <ListItemText>Copy</ListItemText>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ⌘C
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>any</ListItemIcon>
            <ListItemText>Paste</ListItemText>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ⌘V
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>any</ListItemIcon>
            <ListItemText>Web Clipboard</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </ThemeProvider>
  );
}
