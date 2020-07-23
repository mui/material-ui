import React from 'react';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const defaultTheme = createMuiTheme();

const inputTheme = createMuiTheme({
  variants: {
    MuiButton: [
      {
        props: { variant: 'dashed' },
        styles: {
          padding: '5px 15px',
          border: `3px dashed ${defaultTheme.palette.primary.main}`,
        },
      },
      {
        props: { variant: 'dashed', color: 'secondary' },
        styles: {
          border: `3px dashed ${defaultTheme.palette.secondary.main}`,
        },
      },
      {
        props: { variant: 'dashed', size: 'large' },
        styles: {
          borderWidth: 5,
        },
      },
      {
        props: { variant: 'dashed', color: 'primary', size: 'large' },
        styles: {
          fontWeight: 600,
        },
      },
    ],
  },
});

export default function GlobalThemeVariants() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={inputTheme}>
        <Button variant="dashed">Default</Button>
        <Button variant="dashed" color="secondary">
          Secondary
        </Button>
        <Button variant="dashed" color="primary">
          Primary
        </Button>
        <Button variant="dashed" color="secondary" size="large">
          Secondary large
        </Button>
        <Button variant="dashed" color="primary" size="large">
          Primary large
        </Button>
      </ThemeProvider>
    </div>
  );
}
