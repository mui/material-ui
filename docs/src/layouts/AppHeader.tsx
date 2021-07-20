import * as React from 'react';
import NextLink from 'next/link';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import HeaderNavBar from 'docs/src/components/HeaderNavBar';
import HeaderNavDropdown from 'docs/src/components/HeaderNavDropdown';

const Header = styled('div')({
  position: 'sticky',
  top: 0,
  backdropFilter: 'blur(20px)',
  boxShadow: 'inset 0px -1px 1px #EAEEF3',
  backgroundColor: 'rgba(255,255,255,0.72)',
  display: 'flex',
  alignItems: 'center',
  minHeight: 64,
  padding: '0 1.5rem',
});

const AppHeader = () => {
  return (
    <Header>
      <NextLink href="/branding/home" passHref>
        <Box component="a" lineHeight={0} mr={2.5}>
          <SvgMuiLogo />
        </Box>
      </NextLink>
      <Box display={{ xs: 'none', md: 'initial' }}>
        <HeaderNavBar />
      </Box>
      <Box ml="auto" />
      <Box display={{ md: 'none' }}>
        <HeaderNavDropdown />
      </Box>
    </Header>
  );
};

export default AppHeader;
