/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

export default function UnderlineLink() {
  const preventDefault = (event) => event.preventDefault();

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        typography: 'body1',
        '& > :not(style) + :not(style)': {
          ml: 2,
        },
      }}
      onClick={preventDefault}
    >
      <Link href="#" underline="none">
        {'underline="none"'}
      </Link>
      <Link href="#" underline="hover">
        {'underline="hover"'}
      </Link>
      <Link href="#" underline="always">
        {'underline="always"'}
      </Link>
    </Box>
  );
}
