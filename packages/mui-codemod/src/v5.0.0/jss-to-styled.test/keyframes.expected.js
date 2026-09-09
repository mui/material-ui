import * as React from 'react';
import { styled } from '@mui/material/styles';
const PREFIX = 'keyframes';

const classes = {
  root: `${PREFIX}-root`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    animation: 'pulse 1.5s ease-in-out infinite',
    color: theme.palette.primary.main,
  },

  '@keyframes pulse': {
    '0%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0.4,
    },
  }
}));

export default function Demo() {

  return <Root className={classes.root}>Hello</Root>;
}
