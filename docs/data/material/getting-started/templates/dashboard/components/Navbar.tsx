import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ToggleColorMode from './ToggleColorMode';
import SideNav from './SideNav';
import MenuButton from './MenuButton';
import OptionsMenu from './OptionsMenu';
import Search from './Search';

interface NavBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const Toolbar = styled(MuiToolbar)({
  width: '100%',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  gap: '12px',
  flexShrink: 0,
  '& .MuiTabs-flexContainer': {
    gap: '8px',
    p: '8px',
    pb: 0,
  },
});

export default function Navbar({ mode, toggleColorMode }: NavBarProps) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={(internalTheme) => ({
        boxShadow: 0,
        bgcolor: 'background.default',
        backgroundImage: 'none',
        alignItems: 'center',
        outline: '1px solid',
        outlineColor: internalTheme.palette.divider,
        zIndex: internalTheme.zIndex.drawer - 1,
        left: { xs: 0, md: 240 },
        width: { xs: '100dvw', md: `calc(100% - 240px)` },
        maxHeight: 64,
      })}
    >
      <Toolbar variant="regular" sx={{ alignItems: 'center' }}>
        {isDesktop ? (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              justifyContent: { xs: 'flex-end', md: 'space-between' },
              flexGrow: 1,
              width: '100%',
              maxWidth: { sm: '100%', md: '1700px' },
            }}
          >
            <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
              <CustomIcon />
              <Typography variant="h5" component="h1" color="text.primary">
                Dashboard
              </Typography>
            </Stack>

            <Stack direction="row" sx={{ gap: 1 }}>
              <Search />
              <MenuButton showBadge aria-label="Open notifications">
                <NotificationsRoundedIcon />
              </MenuButton>
              <OptionsMenu />
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Stack>
          </Stack>
        ) : (
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexGrow: 1,
              width: '100%',
            }}
          >
            <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
              <CustomIcon />
              <Typography variant="h4" component="h1" color="text.primary">
                Dashboard
              </Typography>
            </Stack>
            <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuRoundedIcon />
            </MenuButton>
            <SideNav
              open={open}
              toggleDrawer={toggleDrawer}
              mode={mode}
              toggleColorMode={toggleColorMode}
            />
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}

export function CustomIcon() {
  return (
    <Box
      sx={{
        width: '1.5rem',
        height: '1.5rem',
        bgcolor: 'black',
        borderRadius: '999px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage:
          'linear-gradient(135deg, hsl(210, 98%, 60%) 0%, hsl(210, 100%, 35%) 100%)',
        color: 'hsla(210, 100%, 95%, 0.9)',
        border: '1px solid',
        borderColor: 'hsl(210, 100%, 55%)',
        boxShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.3)',
      }}
    >
      <DashboardRoundedIcon color="inherit" sx={{ fontSize: '1rem' }} />
    </Box>
  );
}
