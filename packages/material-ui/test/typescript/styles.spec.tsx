/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { createTheme, Theme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';
import { expectType } from '@material-ui/types';

{
  // Overriding styles
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: blue,
      contrastThreshold: 3,
      tonalOffset: 0.2,
      common: {
        white: '#ffffff',
      },
    },
    typography: {
      h1: {
        fontSize: 24,
      },
      fontSize: 18,
    },
    mixins: {
      toolbar: {
        backgroundColor: 'red',
      },
    },
    breakpoints: {
      step: 3,
    },
    transitions: {
      duration: {
        short: 50,
      },
    },
    spacing: 5,
    zIndex: {
      appBar: 42,
    },
    components: {
      MuiButton: {
        defaultProps: {
          disabled: true,
        },
        styleOverrides: {
          // Name of the styleSheet
          root: {
            // Name of the rule
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          },
        },
      },
      MuiAppBar: {
        defaultProps: {
          position: 'fixed',
        },
      },
    },
  });

  <ThemeProvider theme={theme}>
    <Button>Overrides</Button>
  </ThemeProvider>;
}
const theme2 = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disabled: false,
        TouchRippleProps: {
          center: true,
        },
      },
    },
    MuiTable: {
      defaultProps: {
        cellPadding: 12,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

const t1: string = createTheme().spacing(1);
const t2: string = createTheme().spacing(1, 2);
const t3: string = createTheme().spacing(1, 2, 3);
const t4: string = createTheme().spacing(1, 2, 3, 4);
// @ts-expect-error
const t5 = createTheme().spacing(1, 2, 3, 4, 5);

{
  // allow top level media queries
  // https://github.com/mui-org/material-ui/issues/12277

  // TypeScript thinks `content` is the CSS property not a classname
  const ambiguousStyles = createStyles({
    content: {
      minHeight: '100vh',
    },
    '@media (min-width: 960px)': {
      content: {
        // @ts-expect-error
        display: 'flex',
      },
    },
  });

  const styles = createStyles({
    contentClass: {
      minHeight: '100vh',
    },
    '@media (min-width: 960px)': {
      contentClass: {
        display: 'flex',
      },
    },
  });
}

{
  // theme is defaulted to type of Theme
  const useStyles = makeStyles((theme) => {
    expectType<Theme, typeof theme>(theme);
    return {
      root: {
        margin: theme.spacing(1),
      },
    };
  });
}

{
  // https://github.com/mui-org/material-ui/pull/15546
  // Update type definition to let CSS properties be functions
  interface TestProps {
    foo: boolean;
  }

  // makeStyles accepts properties as functions
  {
    const useStyles = makeStyles({
      root: {
        width: (prop: TestProps) => (prop.foo ? 100 : 0),
      },
      root2: (prop2: TestProps) => ({
        width: (prop: TestProps) => (prop.foo && prop2.foo ? 100 : 0),
      }),
    });

    const styles = useStyles({ foo: true });
    expectType<Record<'root' | 'root2', string>, typeof styles>(styles);
  }

  // makeStyles accepts properties as functions using a callback
  {
    const useStyles = makeStyles((theme) => ({
      root: {
        width: (prop: TestProps) => (prop.foo ? 100 : 0),
      },
      root2: (prop2: TestProps) => ({
        width: (prop: TestProps) => (prop.foo && prop2.foo ? 100 : 0),
        margin: theme.spacing(1),
      }),
    }));

    const styles = useStyles({ foo: true });
    expectType<Record<'root' | 'root2', string>, typeof styles>(styles);
  }

  // createStyles accepts properties as functions
  {
    const styles = createStyles({
      root: {
        width: (prop: TestProps) => (prop.foo ? 100 : 0),
      },
      root2: (prop2: TestProps) => ({
        width: (prop: TestProps) => (prop.foo && prop2.foo ? 100 : 0),
      }),
    });

    const root = makeStyles(styles)({ foo: true }).root;
    expectType<string, typeof root>(root);
  }
}

function themeProviderTest() {
  <ThemeProvider theme={{ foo: 1 }}>{null}</ThemeProvider>;
  // @ts-expect-error
  <ThemeProvider<Theme> theme={{ foo: 1 }}>{null}</ThemeProvider>;
  <ThemeProvider<Theme>
    theme={{ components: { MuiAppBar: { defaultProps: { 'aria-atomic': 'true' } } } }}
  >
    {null}
  </ThemeProvider>;
}
