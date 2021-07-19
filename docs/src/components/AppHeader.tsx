import * as React from 'react';
import NextLink from 'next/link';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import HeaderNav from './HeaderNav';

const Header = styled('div')({
  boxShadow: 'inset 0px -1px 1px #EAEEF3',
  display: 'flex',
  alignItems: 'center',
  minHeight: 64, // TODO: handle responsive
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
      <HeaderNav />
    </Header>
  );
};

export default AppHeader;
