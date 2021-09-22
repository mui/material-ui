import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import HeaderNavBar from 'docs/src/components/header/HeaderNavBar';
import HeaderNavDropdown from 'docs/src/components/header/HeaderNavDropdown';
import ThemeModeToggle from 'docs/src/components/header/ThemeModeToggle';
import { getCookie } from 'docs/src/modules/utils/helpers';
import { useChangeTheme } from 'docs/src/modules/components/ThemeContext';
import Link from 'docs/src/modules/components/Link';
import { DeferredAppSearch } from 'docs/src/modules/components/AppFrame';
import ROUTES from 'docs/src/route';

const Header = styled('header')(({ theme }) => ({
  position: 'sticky',
  top: 0,
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
  const [mode, setMode] = React.useState<string | null>(null);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredMode = prefersDarkMode ? 'dark' : 'light';

  React.useEffect(() => {
    setMode(getCookie('paletteMode') || 'system');
  }, [setMode]);

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
    <Header>
      <Container sx={{ display: 'flex', alignItems: 'center', minHeight: 64 }}>
        <Box
          component={Link}
          href={ROUTES.home}
          aria-label="Go to homepage"
          sx={{ lineHeight: 0, mr: 2 }}
        >
          <SvgMuiLogo width={32} />
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'initial' } }}>
          <HeaderNavBar />
        </Box>
        <Box sx={{ ml: 'auto' }} />
        <Box sx={{ mr: 2 }}>
          <DeferredAppSearch />
        </Box>
        <Box sx={{ display: { md: 'none' }, mr: 1 }}>
          <HeaderNavDropdown />
        </Box>
        {mode !== null ? (
          <ThemeModeToggle
            checked={mode === 'system' ? prefersDarkMode : mode === 'dark'}
            onChange={handleChangeThemeMode}
          />
        ) : null}
      </Container>
    </Header>
  );
}
