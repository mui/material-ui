import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import HeaderNavBar from 'docs/src/components/header/HeaderNavBar';
import HeaderNavDropdown from 'docs/src/components/header/HeaderNavDropdown';
import ThemeModeToggle from 'docs/src/components/header/ThemeModeToggle';
import { useChangeTheme } from 'docs/src/modules/components/ThemeContext';
import Link from 'docs/src/modules/components/Link';
import { DeferredAppSearch } from 'docs/src/modules/components/AppFrame';
import ROUTES from 'docs/src/route';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import { useRouter } from 'next/router';

const Header = styled('header')(({ theme }) => [
  {
    position: 'sticky',
    top: 0,
    transition: theme.transitions.create('top'),
    zIndex: theme.zIndex.appBar,
    backdropFilter: 'blur(20px)',
    boxShadow: `inset 0px -1px 1px ${(theme.vars || theme).palette.grey[100]}`,
    backgroundColor: 'rgba(255,255,255,0.72)',
  },
  theme.applyDarkStyles({
    boxShadow: `inset 0px -1px 1px ${(theme.vars || theme).palette.primaryDark[700]}`,
    backgroundColor: alpha(theme.palette.primaryDark[900], 0.72),
  }),
]);

const HEIGHT = 56;

export default function AppHeader() {
  const changeTheme = useChangeTheme();
  const [mode, setMode] = React.useState<string | null>(null);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const t = useTranslate();
  // Map to store all repository urls of various products
  const githubRepositoryUrls = new Map();
  githubRepositoryUrls.set('core', 'https://github.com/mui/material-ui');
  githubRepositoryUrls.set('x', 'https://github.com/mui/mui-x');
  githubRepositoryUrls.set('toolpad', 'https://github.com/mui/mui-toolpad');
  githubRepositoryUrls.set('design-kits', 'https://github.com/mui/mui-design-kits');

  // get pathname, with the leading '/' removed
  const pathName = useRouter().asPath.substring(1);

  // get product name, using indexOf makes it futureproof
  const productName = pathName.substring(0, pathName.indexOf('/'));

  let repoUrl;
  if (githubRepositoryUrls.has(productName)) repoUrl = githubRepositoryUrls.get(productName);
  else repoUrl = 'https://github.com/mui';
  // fallback

  React.useEffect(() => {
    let initialMode = 'system';
    try {
      initialMode = localStorage.getItem('mui-mode') || initialMode;
    } catch (error) {
      // do nothing
    }
    setMode(initialMode);
  }, []);

  const handleChangeThemeMode = (checked: boolean) => {
    const paletteMode = checked ? 'dark' : 'light';
    setMode(paletteMode);

    localStorage.setItem('mui-mode', paletteMode); // syncing with homepage, can be removed once all pages are migrated to CSS variables
    changeTheme({ paletteMode });
  };

  return (
    <Header>
      <GlobalStyles
        styles={{
          ':root': {
            '--MuiDocs-header-height': `${HEIGHT}px`,
          },
        }}
      />
      <Container sx={{ display: 'flex', alignItems: 'center', minHeight: HEIGHT }}>
        <Box
          component={Link}
          href={ROUTES.home}
          aria-label="Go to homepage"
          sx={{ lineHeight: 0, mr: 2 }}
        >
          <SvgMuiLogo width={30} />
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'initial' } }}>
          <HeaderNavBar />
        </Box>
        <Box sx={{ ml: 'auto' }} />
        <Stack direction="row" spacing={1}>
          <DeferredAppSearch />
          <Tooltip title={t('appFrame.github')} enterDelay={300}>
            <IconButton
              component="a"
              color="primary"
              href={repoUrl}
              data-ga-event-category="header"
              data-ga-event-action="github"
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {mode !== null ? (
            <ThemeModeToggle
              checked={mode === 'system' ? prefersDarkMode : mode === 'dark'}
              onChange={handleChangeThemeMode}
            />
          ) : null}
        </Stack>
        <Box sx={{ display: { md: 'none' }, ml: 1 }}>
          <HeaderNavDropdown />
        </Box>
      </Container>
    </Header>
  );
}
