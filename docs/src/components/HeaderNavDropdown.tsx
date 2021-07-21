import * as React from 'react';
import NextLink from 'next/link';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import SvgHambugerMenu from 'docs/src/icons/SvgHamburgerMenu';

const Anchor = styled('a')(({ theme }) => ({
  ...theme.typography.body2,
  fontWeight: 700,
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  display: 'block',
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  '&:hover, &:focus': {
    backgroundColor: theme.palette.grey[200],
  },
}));

export default function HeaderNavDropdown() {
  const [open, setOpen] = React.useState(false);
  const hambugerRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <React.Fragment>
      <IconButton
        ref={hambugerRef}
        disableRipple
        onClick={() => setOpen((value) => !value)}
        sx={{
          position: 'relative',
          borderRadius: 1,
          '&:focus': { boxShadow: `0 0 0 1px #e5e8ec` },
          '& rect': {
            transformOrigin: 'center',
            transition: '0.2s',
          },
          ...(open && {
            '& rect:first-of-type': {
              transform: 'translate(1.5px, 1.6px) rotateZ(-45deg)',
            },
            '& rect:last-of-type': {
              transform: 'translate(1.5px, -1.2px) rotateZ(45deg)',
            },
          }),
        }}
      >
        <SvgHambugerMenu />
      </IconButton>
      <ClickAwayListener
        onClickAway={(event) => {
          // @ts-ignore
          if (hambugerRef.current && !hambugerRef.current.contains(event.target)) {
            setOpen(false);
          }
        }}
      >
        <Collapse
          in={open}
          sx={{
            position: 'fixed',
            top: 56,
            left: 0,
            right: 0,
            boxShadow: '0 15px 10px -5px rgb(90 105 120 / 10%)',
          }}
        >
          <Box p={2.5} bgcolor="background.paper">
            <NextLink href="/branding/home" passHref>
              <Anchor>Products</Anchor>
            </NextLink>
            <NextLink href="/branding/home" passHref>
              <Anchor>Docs</Anchor>
            </NextLink>
            <NextLink href="/branding/home" passHref>
              <Anchor>Pricing</Anchor>
            </NextLink>
            <NextLink href="/branding/home" passHref>
              <Anchor>About us</Anchor>
            </NextLink>
          </Box>
        </Collapse>
      </ClickAwayListener>
    </React.Fragment>
  );
}
