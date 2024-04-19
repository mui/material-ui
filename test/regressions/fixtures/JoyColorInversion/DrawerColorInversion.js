import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Drawer from '@mui/joy/Drawer';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';

export default function DrawerColorInversion() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Box sx={{ width: '100vw', height: '100vh', bgcolor: 'background.body' }} />
      <Drawer open color="primary" variant="solid" invertedColors>
        <Box role="presentation">
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
              <ListItem key={text}>
                <ListItemButton>{text}</ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text) => (
              <ListItem key={text}>
                <ListItemButton>{text}</ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Card variant="soft">
          <Typography level="title-lg" fontFamily="code">
            •••• •••• •••• 1212
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
            <div>
              <Typography fontSize="xs" fontFamily="code">
                CARD NAME
              </Typography>
              <Typography level="title-sm" fontSize="sm">
                JOHN DOE
              </Typography>
            </div>
            <div>
              <Typography fontSize="xs" textAlign="right" fontFamily="code">
                EXPIRE
              </Typography>
              <Typography level="title-sm" fontSize="sm" textAlign="right">
                07/25
              </Typography>
            </div>
          </Box>
        </Card>
      </Drawer>
    </CssVarsProvider>
  );
}
