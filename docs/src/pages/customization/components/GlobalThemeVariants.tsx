import React from 'react';
import {
  createMuiTheme,
  makeStyles,
  Theme,
  ThemeProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

declare module '@material-ui/core/Button/Button' {
  interface ButtonPropsColorOverrides {
    teal: true;
  }
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
  interface ButtonPropsSizeOverrides {
    xlarge: true;
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const theme = createMuiTheme({
  variants: {
    MuiButton: [
      {
        matcher: { variant: 'dashed' },
        styles: {
          padding: '5px 15px',
          border: '5px dashed grey',
        },
      },
      {
        matcher: { variant: 'dashed', color: 'teal' },
        styles: {
          border: '5px dashed teal',
        },
      },
      {
        matcher: { size: 'xlarge' },
        styles: {
          fontSize: 20,
        },
      },
    ],
  },
});

export default function GlobalThemeVariants() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Button variant="dashed">Dashed</Button>
        <Button variant="dashed" color="teal">
          Dashed teal
        </Button>
        <Button variant="dashed" color="teal" size="xlarge">
          Extra large teal dashed
        </Button>
      </div>
    </ThemeProvider>
  );
}
