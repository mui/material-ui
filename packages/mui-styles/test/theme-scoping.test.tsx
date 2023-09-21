import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import * as material from '@mui/material/styles';
import * as joy from '@mui/joy/styles';
import { makeStyles } from '@mui/styles';

describe('Theme scoping', () => {
  const { render } = createRenderer();

  it('works without theme scoping', () => {
    const useStyles = makeStyles<material.Theme>((theme) => ({
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
        <material.ThemeProvider theme={material.createTheme()}>
          <Component />
        </material.ThemeProvider>,
      ),
    ).not.to.throw();
  });

  it('theme scoping works', () => {
    const useStyles = makeStyles<material.Theme>((theme) => ({
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
        <material.ThemeProvider theme={{ [material.THEME_ID]: material.createTheme() }}>
          <Component />
        </material.ThemeProvider>,
      ),
    ).not.to.throw();
  });

  it('theme scoping works with custom theme', () => {
    // @ts-ignore
    const useStyles = makeStyles<material.Theme>((theme) => ({
      root: {
        mixBlendMode: theme.palette.divider,
      },
    }));
    function Component() {
      const classes = useStyles();

      return <div className={classes.root}>Component</div>;
    }

    const { container } = render(
      <material.ThemeProvider
        theme={{
          [material.THEME_ID]: material.createTheme({
            palette: {
              divider: 'darken',
            },
          }),
        }}
      >
        <Component />
      </material.ThemeProvider>,
    );
    expect(container.firstChild).toHaveComputedStyle({ mixBlendMode: 'darken' });
  });

  it('should get Material UI theme even it is inside Joy provider', () => {
    const useStyles = makeStyles<material.Theme>((theme) => ({
      root: {
        color: theme.palette.grey[700], // joy does not have `grey` in the default theme.
      },
    }));
    function Component() {
      const classes = useStyles();

      return <div className={classes.root}>Component</div>;
    }

    expect(() =>
      render(
        <material.ThemeProvider theme={{ [material.THEME_ID]: material.createTheme() }}>
          <joy.ThemeProvider>
            <Component />
          </joy.ThemeProvider>
        </material.ThemeProvider>,
      ),
    ).not.to.throw();
  });
});
