import { createTheme } from '@material-ui/core/styles';

const theme = createTheme();

// MuiCssBaseline overrides
{
  createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          'html, body': {
            color: 'white',
          },
        },
      },
    },
  });
}

// theme.typography[variant]
{
  createTheme({
    components: {
      MuiListItemSecondaryAction: {
        styleOverrides: {
          root: {
            ...theme.typography.body1,
          },
        },
      },
    },
  });
}

// theme.mixins[mixin]
{
  createTheme({
    components: {
      MuiListItemSecondaryAction: {
        styleOverrides: {
          root: {
            ...theme.mixins.toolbar,
          },
        },
      },
    },
  });
}

{
  createTheme({
    components: {
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            color: 'black',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          label: {
            color: 'black',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            color: 'black',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: 'black',
          },
        },
      },
    },
  });
}
