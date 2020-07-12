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

const inputTheme = (outerTheme: Theme) =>
  createMuiTheme({
    variants: {
      MuiButton: [
        {
          matcher: { variant: 'dashed' },
          styles: {
            padding: '5px 15px',
            border: `5px dashed ${outerTheme.palette.primary.main}`,
          },
        },
        {
          matcher: { variant: 'dashed', color: 'secondary' },
          styles: {
            border: `5px dashed ${outerTheme.palette.secondary.main}`,
          },
        },
      ],
    },
  });

export default function GlobalThemeVariants() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={inputTheme}>
      <div className={classes.root}>
        <Button variant="dashed">Dashed</Button>
        <Button variant="dashed" color="secondary">
          Dashed secondary
        </Button>
      </div>
    </ThemeProvider>
  );
}
