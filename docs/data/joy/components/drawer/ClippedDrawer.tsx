import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import PermanentDrawer from '@mui/joy/PermanentDrawer';
import CssBaseline from '@mui/joy/CssBaseline';
import List from '@mui/joy/List';
import Typography from '@mui/joy/Typography';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

export default function ClippedDrawer() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{ position: 'fixed', zIndex: 10 }}>
        <Box
          sx={{
            color: 'white',
            fontSize: 20,
            marginTop: 'auto',
            marginBottom: 'auto',
            marginLeft: 1,
          }}
        >
          ClippedDrawer
        </Box>
      </AppBar>
      <PermanentDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiPermanentDrawer-content': {
            width: drawerWidth,
            boxSizing: 'border-box',
            p: 0,
          },
        }}
        anchor="left"
      >
        <Box
          sx={(theme) => ({
            boxSizing: 'border-box',
            minHeight: 55,
            borderBottom: 1,
            borderColor: theme.palette.divider,
          })}
        />
        <Box role="presentation">
          <List sx={{ mb: 1 }}>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text}>
                <ListItemButton>
                  <ListItemDecorator>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemDecorator>
                  <ListItemContent>{text}</ListItemContent>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text}>
                <ListItemButton>
                  <ListItemDecorator>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemDecorator>
                  <ListItemContent>{text}</ListItemContent>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </PermanentDrawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 1, pt: 2 }}
      >
        <Box sx={{ minHeight: 56 }} />
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}

const AppBar = styled('header')(({ theme }) => ({
  minHeight: 56,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  boxSizing: 'border-box', // Prevent padding issue with the Modal and fixed positioned AppBar.
  flexShrink: 0,
  position: 'fixed',
  top: 0,
  left: 'auto',
  right: 0,
  ...theme.variants.solid.primary,
}));
