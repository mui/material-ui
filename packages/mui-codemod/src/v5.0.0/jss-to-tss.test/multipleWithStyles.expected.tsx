import React from 'react';
import Button from '@mui/material/Button';
import { withStyles } from 'tss-react/mui';

const Button1 = withStyles(Button, {
  root: {
    backgroundColor: 'red',
  },
});

const Button2 = withStyles(Button, theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  actions: {
    padding: theme.spacing(1),
  },
}));

const Button3 = withStyles(Button, {
  root: {
    backgroundColor: 'blue',
  },
  actions: {
    padding: '0px',
  },
});

export const Test = () => (
  <React.Fragment>
    <Button1 />
    <Button2 />
    <Button3 />
  </React.Fragment>
);
