import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import { Theme, ThemeProvider, createTheme, THEME_ID } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

describe('Theme scoping', () => {
  const { render } = createRenderer();

  it('works without theme scoping', () => {
    const useStyles = makeStyles<Theme>((theme) => ({
      root: {
        color: theme.palette.primary.main,
      },
    }));
    function Component() {
      const classes = useStyles();

      return <div className={classes.root}>Component</div>;
    }

    expect(() =>
      render(
        <ThemeProvider theme={createTheme()}>
          <Component />
        </ThemeProvider>,
      ),
    ).not.to.throw();
  });

  it('theme scoping works', () => {
    const useStyles = makeStyles<Theme>((theme) => ({
      root: {
        color: theme.palette.primary.main,
      },
    }));
    function Component() {
      const classes = useStyles();

      return <div className={classes.root}>Component</div>;
    }

    expect(() =>
      render(
        <ThemeProvider theme={{ [THEME_ID]: createTheme() }}>
          <Component />
        </ThemeProvider>,
      ),
    ).not.to.throw();
  });
});
