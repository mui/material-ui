import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {
  createTheme,
  makeStyles,
  createStyles,
  Theme as AugmentedTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

declare module '@material-ui/core/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const useStyles = makeStyles((theme: AugmentedTheme) =>
  createStyles({
    root: {
      color: theme.status.danger,
      '&$checked': {
        color: theme.status.danger,
      },
    },
    checked: {},
  }),
);

function CustomCheckbox() {
  const classes = useStyles();

  return (
    <Checkbox
      defaultChecked
      classes={{
        root: classes.root,
        checked: classes.checked,
      }}
    />
  );
}

const theme = createTheme({
  status: {
    danger: orange[500],
  },
});

export default function CustomStyles() {
  return (
    <ThemeProvider theme={theme}>
      <CustomCheckbox />
    </ThemeProvider>
  );
}
