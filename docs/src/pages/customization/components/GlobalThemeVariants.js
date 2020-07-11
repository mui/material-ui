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

const theme = (outerTheme) =>
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
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Button variant="dashed">Dashed</Button>
        <Button variant="dashed" color="secondary">
          Dashed secondary
        </Button>
      </div>
    </ThemeProvider>
  );
}
