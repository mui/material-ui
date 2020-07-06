import React from 'react';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
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
        matcher: { size: 'xxlarge' },
        styles: {
          fontSize: 20,
        },
      },
    ],
  },
});

export default function CustomVariantButtons() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Button variant="dashed" className={classes.margin}>
        Dashed
      </Button>
      <Button variant="dashed" color="teal" className={classes.margin}>
        Dashed teal
      </Button>
      <Button
        variant="dashed"
        color="teal"
        size="xxlarge"
        className={classes.margin}
      >
        Extra large teal dashed
      </Button>
    </ThemeProvider>
  );
}
