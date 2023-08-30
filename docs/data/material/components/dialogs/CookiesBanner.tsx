import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.default,
}));

export default function CookiesBanner(props: Props) {
  const { window } = props;
  const [open, setOpen] = React.useState(true);

  const toggleDialog = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root sx={{ bgcolor: 'background.default' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: '100%' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            App
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ m: 1, mt: 10 }}>
        <Typography paragraph>
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
        <Typography paragraph>
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
      <Dialog
        hideBackdrop
        disableScrollLock
        container={container}
        open={open}
        fullWidth
        maxWidth={false}
        sx={{
          '& .MuiDialog-container': {
            maxWidth: '100%',
            width: '100%',
            alignItems: 'stretch',
            justifyContent: 'stretch',
            position: 'relative',
          },
          '& .MuiDialog-paper': {
            boxShadow: 10,
            position: 'absolute',
            maxWidth: '100%',
            width: '100%',
            m: 0,
            bottom: 0,
            p: 1,
            borderRadius: 0,
            border: 1,
            borderColor: 'divider',
          },
        }}
      >
        <Typography variant="h5" gutterBottom>
          This website uses cookies
        </Typography>
        <Stack direction="row">
          <Typography>
            example.com relies on cookies to improve your experience. Cookies are
            used to show you relevant content and to analyze our website traffic.
          </Typography>
          <Stack direction="column" gap={0.5} sx={{ width: '350px' }}>
            <Button
              size="small"
              onClick={() => toggleDialog(false)}
              variant="contained"
            >
              Allow all
            </Button>
            <Button
              size="small"
              onClick={() => toggleDialog(false)}
              variant="outlined"
              endIcon={<ChevronRightIcon />}
            >
              Customize
            </Button>
            <Button
              size="small"
              onClick={() => toggleDialog(false)}
              variant="outlined"
            >
              Use necessary only
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </Root>
  );
}
