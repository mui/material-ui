import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  experimental_dedicatedCssLayer: true,
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
  },
});

export default function CssLayer() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles="@layer mui.base,mui.theme,mui.sx;" />
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        {/* <Button
          startIcon={
            <Box
              sx={{
                width: '40px',
                height: '40px',
                bgcolor: 'salmon',
                borderRadius: '50%',
                color: 'yellow',
              }}
            >
              I
            </Box>
          }
          sx={{
            color: 'red',
          }}
        >
          Hello
        </Button> */}
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
      </div>
    </ThemeProvider>
  );
}
