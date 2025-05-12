import {
  createTheme,
  ThemeOptions,
  type ComponentsVariants,
  type Theme,
} from '@mui/material/styles';

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
      MuiPopper: {
        styleOverrides: {
          root: {
            backgroundColor: 'red',
          },
        },
      },
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
      MuiRadioGroup: {
        styleOverrides: {
          row: {
            justifyContent: 'space-between',
          },
        },
      },
      MuiGrid: {
        styleOverrides: {
          root: {
            justifyContent: 'space-between',
          },
          container: {
            justifyContent: 'space-between',
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
        styleOverrides: {
          root: {
            variants: [
              {
                props: { variant: 'contained' },
                style: {
                  backdropFilter: 'none',
                },
              },
            ],
          },
          endIcon: ({ theme: t }) => ({
            backgroundColor: t.vars.palette.primary.main,
            variants: [
              {
                props: ({ ownerState }) => ownerState.color === 'primary',
                style: {},
              },
            ],
          }),
        },
      },
    },
  });
}

// props callback in variants
{
  createTheme({
    components: {
      MuiButton: {
        variants: [
          {
            props: (props) => props.color !== 'secondary',
            style: ({ theme: { palette } }) => ({
              backgroundColor: palette.grey[500],
            }),
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

// CSS variables for shadow DOM
{
  createTheme({
    cssVariables: {
      rootSelector: ':host',
      colorSchemeSelector: 'class',
    },
  });
}

// Invalid variant
{
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          // @ts-expect-error invalid variant
          root: {
            variants: [
              {
                props: { variant: 'not-a-variant' },
                style: { border: 0 },
              },
            ],
          },
        },
      },
    },
  });
}

// Using ComponentVariants to define variants separately
const alertVariants: ComponentsVariants<Theme>['MuiAlert'] = [
  {
    props: { severity: 'info' },
    style: ({ theme: themeParam }) => ({
      backgroundColor: '#60a5fa',
      color: themeParam.palette.info.main,
    }),
  },
];

{
  createTheme({
    components: {
      MuiAlert: {
        styleOverrides: {
          root: {
            variants: alertVariants,
          },
        },
      },
    },
  });
}
