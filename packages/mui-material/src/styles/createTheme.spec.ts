import { createTheme, ThemeOptions } from '@mui/material/styles';

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

// MuiCssBaseline styleOverrides key as a callback
{
  createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: (themeParam) => `
          span {
            background-color: ${themeParam.palette.success.main};
            color: ${themeParam.palette.error.main};
          }
        `,
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
      MuiBadge: {
        styleOverrides: {
          colorInfo: {
            backgroundColor: '#232323',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          containedSuccess: {
            backgroundColor: '#7CFC00',
          },
          containedError: {
            backgroundColor: '#FF4500',
          },
          containedInfo: {
            backgroundColor: '#7B68EE',
          },
          containedWarning: {
            backgroundColor: '#FFD700',
          },
          textSuccess: {
            color: '#7CFC00',
          },
          textError: {
            color: '#FF4500',
          },
          textInfo: {
            color: '#7B68EE',
          },
          textWarning: {
            color: '#FFD700',
          },
          outlinedSuccess: {
            color: '#7CFC00',
          },
          outlinedError: {
            color: '#FF4500',
          },
          outlinedInfo: {
            color: '#7B68EE',
          },
          outlinedWarning: {
            color: '#FFD700',
          },
        },
      },
    },
  });
}

{
  createTheme(theme, {
    components: {
      MuiButton: {
        variants: [
          {
            props: {}, // match any props combination
            style: ({ theme: t }) => {
              return {
                fontFamily: t.typography.fontFamily,
              };
            },
          },
        ],
      },
    },
  } as ThemeOptions);
}

{
  createTheme({
    components: {
      MuiButton: {
        variants: [
          {
            props: {}, // match any props combination
            style: ({ theme: t }) => {
              return {
                fontFamily: t.typography.fontFamily,
              };
            },
          },
        ],
      },
    },
  });
}

{
  createTheme({
    shape: {
      // @ts-expect-error invalid borderRadius string value in theme
      borderRadius: '5px',
    },
  });
}
