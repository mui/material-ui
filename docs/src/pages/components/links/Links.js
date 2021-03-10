/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const Box = styled('div')(({ theme }) => ({
  ...theme.typography.body1,
  '& > :not(style) + :not(style)': {
    marginLeft: theme.spacing(2),
  },
}));

export default function Links() {
  const preventDefault = (event) => event.preventDefault();

  return (
    <Box onClick={preventDefault}>
      <Link href="#">Link</Link>
      <Link href="#" color="inherit">
        {'color="inherit"'}
      </Link>
      <Link href="#" variant="body2">
        {'variant="body2"'}
      </Link>
    </Box>
  );
}
