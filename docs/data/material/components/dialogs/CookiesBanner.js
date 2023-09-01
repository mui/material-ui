import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ClickAwayListener } from '@mui/base';
import { CssBaseline } from '@mui/material';

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.default,
}));

export default function CookiesBanner() {
  const [open, setOpen] = React.useState(false);
  const [bannerOpen, setBannerOpen] = React.useState(true);

  const onClickAway = () => {
    setOpen(false);
  };

  const onTrapFocusFocus = () => {
    setOpen(true);
  };

  const closeBanner = () => {
    setBannerOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Root sx={{ bgcolor: 'background.default', position: 'relative' }}>
        <Box component="main">
          <AppBar position="fixed">
            <Toolbar>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box sx={{ m: 1, pt: 10 }}>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
              non enim praesent elementum facilisis leo vel. Risus at ultrices mi
              tempus imperdiet.
            </Typography>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
              non enim praesent elementum facilisis leo vel. Risus at ultrices mi
              tempus imperdiet.
            </Typography>
          </Box>
        </Box>
        <Fade appear={false} in={bannerOpen}>
          <div>
            <TrapFocus open={open} disableRestoreFocus>
              <div>
                <ClickAwayListener onClickAway={onClickAway}>
                  <Paper
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      maxWidth: '100%',
                      width: '100%',
                      m: 0,
                      p: 2,
                      borderRadius: 0,
                      borderTop: 1,
                      borderColor: 'divider',
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
                          onFocus={onTrapFocusFocus}
                          onClick={closeBanner}
                          variant="contained"
                        >
                          Allow all
                        </Button>
                        <Button
                          onFocus={onTrapFocusFocus}
                          size="small"
                          onClick={closeBanner}
                          variant="text"
                        >
                          Reject all
                        </Button>
                      </Stack>
                    </Stack>
                  </Paper>
                </ClickAwayListener>
              </div>
            </TrapFocus>
          </div>
        </Fade>
      </Root>
    </React.Fragment>
  );
}
