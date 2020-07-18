import React from 'react';
import {
  createMuiTheme,
  makeStyles,
  Theme,
  ThemeProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

declare module '@material-ui/core/Button/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

const useStyles = makeStyles((theme: Theme) => ({
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
