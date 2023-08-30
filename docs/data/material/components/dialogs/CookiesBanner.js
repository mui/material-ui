import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.default,
}));

function CookiesBanner(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(true);

  const toggleDialog = (newOpen) => {
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
          imperdiet.
        </Typography>
      </Box>
      <Dialog
        hideBackdrop
        disableScrollLock
        container={container}
        open={open}
        fullWidth
        sx={{
          '& .MuiDialog-container': {
            maxWidth: '100%',
            width: '100%',
          },
          '& .MuiDialog-paper': {
            position: 'fixed',
            bottom: 0,
            maxWidth: '100%',
            width: '100%',
            m: 0,
            p: 2,
            borderRadius: 0,
            borderTop: 1,
            borderColor: 'divider',
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <div>
            <Typography>This website uses cookies</Typography>
            <Typography variant="body2">
              example.com relies on cookies to improve your experience.
            </Typography>
          </div>
          <Stack direction="row" gap={1}>
            <Button
              size="small"
              onClick={() => toggleDialog(false)}
              variant="contained"
            >
              Allow all
            </Button>
            <Button size="small" onClick={() => toggleDialog(false)} variant="text">
              Reject all
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </Root>
  );
}

CookiesBanner.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default CookiesBanner;
