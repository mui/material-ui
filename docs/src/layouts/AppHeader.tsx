import * as React from 'react';
import NextLink from 'next/link';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import HeaderNavBar from 'docs/src/components/header/HeaderNavBar';
import HeaderNavDropdown from 'docs/src/components/header/HeaderNavDropdown';
import ThemeModeToggle from 'docs/src/components/header/ThemeModeToggle';

const Header = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
  backdropFilter: 'blur(20px)',
  boxShadow: 'inset 0px -1px 1px #EAEEF3',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.72)' : 'rgba(255,255,255,0.72)',
}));

export default function AppHeader() {
  const [dark, setDark] = React.useState(false);
  return (
    <Header>
      <Container sx={{ display: 'flex', alignItems: 'center', minHeight: 64 }}>
        <NextLink href="/branding/home" passHref>
          <Box component="a" sx={{ lineHeight: 0, mr: 2 }}>
            <SvgMuiLogo width={32} />
          </Box>
        </NextLink>
        <Box sx={{ display: { xs: 'none', md: 'initial' } }}>
          <HeaderNavBar />
        </Box>
        <Box sx={{ ml: 'auto' }} />
        <Box sx={{ display: { md: 'none' } }}>
          <HeaderNavDropdown />
        </Box>
        <ThemeModeToggle checked={dark} onChange={(event) => setDark(event.target.checked)} />
      </Container>
    </Header>
  );
}
