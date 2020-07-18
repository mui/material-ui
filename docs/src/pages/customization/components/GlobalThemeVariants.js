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
        matcher: { variant: 'dashed' },
        styles: {
          padding: '5px 15px',
          border: `5px dashed ${defaultTheme.palette.primary.main}`,
        },
      },
      {
        matcher: { variant: 'dashed', color: 'secondary' },
        styles: {
          border: `5px dashed ${defaultTheme.palette.secondary.main}`,
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
        <Button variant="dashed">Dashed</Button>
        <Button variant="dashed" color="secondary">
          Dashed secondary
        </Button>
      </ThemeProvider>
    </div>
  );
}
