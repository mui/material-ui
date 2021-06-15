import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    backgroundColor: theme.palette.secondary.main,
  },
  [theme.breakpoints.up('md')]: {
    backgroundColor: theme.palette.primary.main,
  },
  [theme.breakpoints.up('lg')]: {
    backgroundColor: green[500],
  },
}));

export default function MediaQuery() {
  return (
    <Root>
      <Typography>{'down(sm): red'}</Typography>
      <Typography>{'up(md): blue'}</Typography>
      <Typography>{'up(lg): green'}</Typography>
    </Root>
  );
}
