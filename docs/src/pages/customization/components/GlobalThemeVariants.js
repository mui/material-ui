import * as React from 'react';
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

const theme = createMuiTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashed' },
          styles: {
            textTransform: 'none',
            border: `2px dashed ${defaultTheme.palette.primary.main}`,
            color: defaultTheme.palette.primary.main,
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary' },
          styles: {
            border: `2px dashed ${defaultTheme.palette.secondary.main}`,
            color: defaultTheme.palette.secondary.main,
          },
        },
        {
          props: { variant: 'dashed', size: 'large' },
          styles: {
            borderWidth: 4,
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary', size: 'large' },
          styles: {
            fontSize: 18,
          },
        },
      ],
    },
  },
});

export default function GlobalThemeVariants() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Button variant="dashed">Dashed</Button>
        <Button variant="dashed" color="secondary">
          Secondary
        </Button>
        <Button variant="dashed" size="large">
          Large
        </Button>
        <Button variant="dashed" color="secondary" size="large">
          Secondary large
        </Button>
      </ThemeProvider>
    </div>
  );
}
