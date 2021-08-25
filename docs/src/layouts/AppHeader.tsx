import * as React from 'react';
import { styled, alpha } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NoSsr from '@material-ui/core/NoSsr';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import HeaderNavBar from 'docs/src/components/header/HeaderNavBar';
import HeaderNavDropdown from 'docs/src/components/header/HeaderNavDropdown';
import ThemeModeToggle from 'docs/src/components/header/ThemeModeToggle';
import { getCookie } from 'docs/src/modules/utils/helpers';
import { useChangeTheme } from 'docs/src/modules/components/ThemeContext';
import Link from 'docs/src/modules/components/Link';
import { DeferredAppSearch } from 'docs/src/modules/components/AppFrame';
import ROUTES from 'docs/src/route';

const Header = styled('header', {
  shouldForwardProp: (prop) => prop !== 'trigger',
})<{ trigger: boolean }>(({ theme, trigger }) => ({
  position: 'sticky',
  top: trigger ? -80 : 0,
  transition: theme.transitions.create('top'),
  zIndex: theme.zIndex.appBar,
  backdropFilter: 'blur(20px)',
  boxShadow: `inset 0px -1px 1px ${
    theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[100]
  }`,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.primaryDark[900], 0.72)
      : 'rgba(255,255,255,0.72)',
}));

export default function AppHeader() {
  const changeTheme = useChangeTheme();
  const [mode, setMode] = React.useState(getCookie('paletteMode') || 'system');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredMode = prefersDarkMode ? 'dark' : 'light';

  const handleChangeThemeMode = (checked: boolean) => {
    let paletteMode = 'system';
    paletteMode = checked ? 'dark' : 'light';
    if (paletteMode === null) {
      return;
    }

    setMode(paletteMode);

    if (paletteMode === 'system') {
      document.cookie = `paletteMode=;path=/;max-age=31536000`;
      changeTheme({ paletteMode: preferredMode });
    } else {
      document.cookie = `paletteMode=${paletteMode};path=/;max-age=31536000`;
      changeTheme({ paletteMode });
    }
  };
  return (
    <Header trigger={false}>
      <Container sx={{ display: 'flex', alignItems: 'center', minHeight: 64 }}>
        <Box
          component={Link}
          href={ROUTES.home}
          aria-label="Goto homepage"
          sx={{ lineHeight: 0, mr: 2 }}
        >
          <SvgMuiLogo width={32} />
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'initial' } }}>
          <HeaderNavBar />
        </Box>
        <Box sx={{ ml: 'auto' }} />
        <Box sx={{ mr: 1 }}>
          <DeferredAppSearch />
        </Box>
        <Box sx={{ display: { md: 'none' }, mr: 1 }}>
          <HeaderNavDropdown />
        </Box>
        <NoSsr>
          <ThemeModeToggle
            checked={mode === 'system' ? prefersDarkMode : mode === 'dark'}
            onChange={handleChangeThemeMode}
          />
        </NoSsr>
      </Container>
    </Header>
  );
}
