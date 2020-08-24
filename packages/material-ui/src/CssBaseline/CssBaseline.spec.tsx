import { createMuiTheme } from '@material-ui/core';

// overrides story
{
  // reduced example from
  // https://github.com/mui-org/material-ui/blob/next/docs/src/pages/customization/typography/typography.md
  createMuiTheme({
    components: {
      MuiCssBaseline: {
        cssOverrides: {
          '@global': {
            '@font-face': [{ fontFamily: 'custom', fontWeight: 600 }],
          },
        },
      },
    },
  });
  // assuming "@global" is a class
  createMuiTheme({
    components: {
      MuiCssBaseline: {
        cssOverrides: {
          '@global': {
            // @ts-expect-error
            fontWeight: 'bold',
          },
        },
      },
    },
  });
  // reset.css
  createMuiTheme({
    components: {
      MuiCssBaseline: {
        cssOverrides: {
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
    },
  });
}
