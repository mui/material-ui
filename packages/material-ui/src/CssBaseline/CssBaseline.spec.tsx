import { createTheme } from '@material-ui/core';

// overrides story
{
  // reduced example from
  // https://github.com/mui-org/material-ui/blob/master/docs/src/pages/customization/typography/typography.md
  createTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [{ fontFamily: 'custom', fontWeight: 600 }],
        },
      },
    },
  });
  // assuming "@global" is a class
  createTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          // @ts-expect-error
          fontWeight: 'bold',
        },
      },
    },
  });
  // reset.css
  createTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          ul: {
            'list-style': 'none',
          },
          p: {
            fontWeight: 'bolde', // undesired, should throw
          },
        },
      },
    },
  });
}
