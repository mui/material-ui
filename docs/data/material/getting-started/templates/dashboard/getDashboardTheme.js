import * as React from 'react';

import { alpha } from '@mui/material/styles';

import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { brand, getDesignTokens, gray, green, red } from './themePrimitives';

export default function getDashboardTheme(mode) {
  return {
    ...getDesignTokens(mode),
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
          disableRipple: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            boxSizing: 'border-box',
            transition: 'all 100ms ease-in',
            '&:focus-visible': {
              outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
              outlineOffset: '2px',
            },
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            boxShadow: 'none',
            borderRadius: theme.shape.borderRadius,
            textTransform: 'none',
            '& .MuiSvgIcon-root': { width: '1.125rem', height: '1.125rem' },
            variants: [
              {
                props: {
                  size: 'small',
                },
                style: {
                  height: '2rem', // 32px
                  padding: '0 0.5rem',
                },
              },
              {
                props: {
                  size: 'medium',
                },
                style: {
                  height: '2.5rem', // 40px
                },
              },
              {
                props: {
                  color: 'primary',
                  variant: 'contained',
                },
                style: {
                  color: 'white',
                  backgroundColor: gray[900],
                  backgroundImage: `linear-gradient(to bottom, ${gray[700]}, ${gray[800]})`,
                  boxShadow: `inset 0 2px 0 ${gray[600]}, inset 0 -2px 0 hsl(220, 0%, 0%)`,
                  border: `1px solid ${gray[700]}`,
                  '&:hover': {
                    backgroundImage: 'none',
                    backgroundColor: gray[700],
                    boxShadow: 'none',
                  },
                  '&:active': {
                    backgroundColor: gray[800],
                  },
                  ...theme.applyStyles('dark', {
                    color: 'black',
                    backgroundColor: gray[50],
                    backgroundImage: `linear-gradient(to bottom, ${gray[100]}, ${gray[50]})`,
                    boxShadow:
                      'inset 0 2px 0 hsl(220, 0%, 100%), inset 0 -2px 0 hsl(220, 30%, 90%)',
                    border: `1px solid ${gray[100]}`,
                    '&:hover': {
                      backgroundImage: 'none',
                      backgroundColor: gray[300],
                      boxShadow: 'none',
                    },
                    '&:active': {
                      backgroundColor: gray[400],
                    },
                  }),
                },
              },
              {
                props: {
                  color: 'secondary',
                  variant: 'contained',
                },
                style: {
                  color: 'white',
                  backgroundColor: brand[300],
                  backgroundImage: `linear-gradient(to bottom, ${alpha(brand[400], 0.8)}, ${brand[500]})`,
                  boxShadow: `inset 0 2px 0 ${alpha(brand[200], 0.2)}, inset 0 -2px 0 ${alpha(brand[700], 0.4)}`,
                  border: `1px solid ${brand[500]}`,
                  '&:hover': {
                    backgroundColor: brand[700],
                    boxShadow: 'none',
                  },
                  '&:active': {
                    backgroundColor: brand[700],
                    backgroundImage: 'none',
                  },
                },
              },
              {
                props: {
                  variant: 'outlined',
                },
                style: {
                  color: theme.palette.text.primary,
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor: gray[50],
                  '&:hover': {
                    backgroundColor: gray[100],
                    borderColor: gray[300],
                  },
                  '&:active': {
                    backgroundColor: gray[200],
                  },
                  ...theme.applyStyles('dark', {
                    backgroundColor: gray[800],
                    '&:hover': {
                      backgroundColor: gray[900],
                      borderColor: gray[600],
                    },
                    '&:active': {
                      backgroundColor: gray[900],
                    },
                  }),
                },
              },
              {
                props: {
                  color: 'secondary',
                  variant: 'outlined',
                },
                style: {
                  color: brand[700],
                  border: '1px solid',
                  borderColor: brand[200],
                  backgroundColor: brand[50],
                  '&:hover': {
                    backgroundColor: brand[100],
                    borderColor: brand[400],
                  },
                  '&:active': {
                    backgroundColor: alpha(brand[200], 0.7),
                  },
                  ...theme.applyStyles('dark', {
                    color: brand[50],
                    border: '1px solid',
                    borderColor: brand[900],
                    backgroundColor: alpha(brand[900], 0.3),
                    '&:hover': {
                      borderColor: brand[700],
                      backgroundColor: alpha(brand[900], 0.6),
                    },
                    '&:active': {
                      backgroundColor: alpha(brand[900], 0.5),
                    },
                  }),
                },
              },
              {
                props: {
                  variant: 'text',
                },
                style: {
                  color: gray[600],
                  '&:hover': {
                    backgroundColor: gray[100],
                  },
                  '&:active': {
                    backgroundColor: gray[200],
                  },
                  ...theme.applyStyles('dark', {
                    color: gray[50],
                    '&:hover': {
                      backgroundColor: gray[700],
                    },
                    '&:active': {
                      backgroundColor: alpha(gray[700], 0.7),
                    },
                  }),
                },
              },
              {
                props: {
                  color: 'secondary',
                  variant: 'text',
                },
                style: {
                  color: brand[700],
                  '&:hover': {
                    backgroundColor: alpha(brand[100], 0.5),
                  },
                  '&:active': {
                    backgroundColor: alpha(brand[200], 0.7),
                  },
                  ...theme.applyStyles('dark', {
                    color: brand[100],
                    '&:hover': {
                      backgroundColor: alpha(brand[900], 0.5),
                    },
                    '&:active': {
                      backgroundColor: alpha(brand[900], 0.3),
                    },
                  }),
                },
              },
            ],
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => {
            return {
              padding: 16,
              transition: 'all 100ms ease',
              backgroundColor: gray[50],
              borderRadius: theme.shape.borderRadius,
              border: `1px solid ${alpha(gray[200], 0.5)}`,
              boxShadow: 'none',
              ...theme.applyStyles('dark', {
                backgroundColor: gray[800],
                border: `1px solid ${alpha(gray[700], 0.3)}`,
              }),
              variants: [
                {
                  props: {
                    variant: 'outlined',
                  },
                  style: {
                    border: `1px solid ${gray[200]}`,
                    boxShadow: 'none',
                    background: `linear-gradient(to bottom, hsl(0, 0%, 100%), ${gray[50]})`,
                  },
                },
                {
                  props: {
                    variant: 'outlined',
                  },
                  style: {
                    ...theme.applyStyles('dark', {
                      border: `1px solid ${alpha(gray[700], 0.4)}`,
                      boxShadow: 'none',
                      background: `linear-gradient(to bottom, ${gray[900]}, ${alpha(
                        gray[800],
                        0.5,
                      )})`,
                    }),
                  },
                },
              ],
            };
          },
        },
      },
      MuiCheckbox: {
        defaultProps: {
          disableRipple: true,
          icon: (
            <CheckBoxOutlineBlankRoundedIcon
              sx={{ color: 'hsla(210, 0%, 0%, 0.0)' }}
            />
          ),
          checkedIcon: <CheckRoundedIcon sx={{ height: 14, width: 14 }} />,
          indeterminateIcon: <RemoveRoundedIcon sx={{ height: 14, width: 14 }} />,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            margin: 10,
            height: 16,
            width: 16,
            borderRadius: 5,
            border: '1px solid ',
            borderColor: alpha(gray[300], 0.8),
            boxShadow: '0 0 0 1.5px hsla(210, 0%, 0%, 0.04) inset',
            backgroundColor: alpha(gray[100], 0.4),
            transition: 'border-color, background-color, 120ms ease-in',
            '&:hover': {
              borderColor: brand[300],
            },
            '&.Mui-focusVisible': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
              borderColor: brand[400],
            },
            '&.Mui-checked': {
              color: 'white',
              backgroundColor: brand[500],
              borderColor: brand[500],
              boxShadow: `none`,
              '&:hover': {
                backgroundColor: brand[600],
              },
            },
            ...theme.applyStyles('dark', {
              borderColor: alpha(gray[700], 0.5),
              boxShadow: '0 0 0 1.5px hsl(210, 0%, 0%) inset',
              backgroundColor: alpha(gray[900], 0.8),
              '&:hover': {
                borderColor: brand[300],
              },
              '&.Mui-focusVisible': {
                borderColor: brand[400],
                outline: `3px solid ${alpha(brand[500], 0.5)}`,
                outlineOffset: '2px',
              },
            }),
          }),
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: 0,
            '&:last-child': { paddingBottom: 0 },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: '1px solid',
            borderRadius: '999px',
            '& .MuiChip-label': {
              padding: '0 4px',
              fontWeight: 600,
            },
            variants: [
              {
                props: {
                  color: 'default',
                },
                style: {
                  borderColor: gray[200],
                  backgroundColor: gray[100],
                  '& .MuiChip-label': {
                    color: gray[500],
                  },
                  '& .MuiChip-icon': {
                    color: gray[500],
                  },
                  ...theme.applyStyles('dark', {
                    borderColor: gray[700],
                    backgroundColor: gray[800],
                    '& .MuiChip-label': {
                      color: gray[300],
                    },
                    '& .MuiChip-icon': {
                      color: gray[300],
                    },
                  }),
                },
              },
              {
                props: {
                  color: 'success',
                },
                style: {
                  borderColor: green[200],
                  backgroundColor: green[50],
                  '& .MuiChip-label': {
                    color: green[500],
                  },
                  '& .MuiChip-icon': {
                    color: green[500],
                  },
                  ...theme.applyStyles('dark', {
                    borderColor: green[800],
                    backgroundColor: green[900],
                    '& .MuiChip-label': {
                      color: green[300],
                    },
                    '& .MuiChip-icon': {
                      color: green[300],
                    },
                  }),
                },
              },
              {
                props: {
                  color: 'error',
                },
                style: {
                  borderColor: red[100],
                  backgroundColor: red[50],
                  '& .MuiChip-label': {
                    color: red[500],
                  },
                  '& .MuiChip-icon': {
                    color: red[500],
                  },
                  ...theme.applyStyles('dark', {
                    borderColor: red[800],
                    backgroundColor: red[900],
                    '& .MuiChip-label': {
                      color: red[200],
                    },
                    '& .MuiChip-icon': {
                      color: red[300],
                    },
                  }),
                },
              },
            ],
          }),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            boxShadow: 'none',
            borderRadius: theme.shape.borderRadius,
            textTransform: 'none',
            fontWeight: theme.typography.fontWeightMedium,
            letterSpacing: 0,
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: gray[50],
            '&:hover': {
              backgroundColor: gray[100],
              borderColor: gray[300],
            },
            '&:active': {
              backgroundColor: gray[200],
            },
            '& .MuiSvgIcon-root': { width: '1.125rem', height: '1.125rem' },
            ...theme.applyStyles('dark', {
              backgroundColor: gray[800],
              '&:hover': {
                backgroundColor: gray[900],
                borderColor: gray[600],
              },
              '&:active': {
                backgroundColor: gray[900],
              },
            }),
            variants: [
              {
                props: {
                  size: 'small',
                },
                style: {
                  width: '2rem',
                  height: '2rem',
                  padding: '0.25rem',
                },
              },
              {
                props: {
                  size: 'medium',
                },
                style: {
                  width: '2.5rem',
                  height: '2.5rem',
                },
              },
            ],
          }),
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            border: 'none',
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: ({ theme }) => ({
            height: 8,
            borderRadius: 8,
            backgroundColor: gray[200],
            ...theme.applyStyles('dark', {
              backgroundColor: gray[800],
            }),
          }),
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: ({ theme }) => ({
            color: brand[600],
            fontWeight: 500,
            position: 'relative',
            textDecoration: 'none',
            '&::before': {
              content: '""',
              position: 'absolute',
              width: 0,
              height: '1px',
              bottom: 0,
              left: 0,
              backgroundColor: brand[200],
              opacity: 0.7,
              transition: 'width 0.3s ease, opacity 0.3s ease',
            },
            '&:hover::before': {
              width: '100%',
              opacity: 1,
            },
            '&:focus-visible': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '4px',
              borderRadius: '2px',
            },
            ...theme.applyStyles('dark', {
              color: brand[200],
            }),
          }),
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: ({ theme }) => ({
            padding: 0,
            '&.Mui-selected': { borderRadius: theme.shape.borderRadius },
          }),
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: ({ theme }) => ({
            minWidth: 0,
            marginRight: '8px',
            color: theme.palette.grey[500],
            ...theme.applyStyles('dark', { color: theme.palette.grey[100] }),
          }),
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.grey[700],
            ...theme.applyStyles('dark', { color: theme.palette.grey[50] }),
          }),
          primary: { fontWeight: 600 },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            padding: '4px 0',
            borderRadius: theme.shape.borderRadius,
            background: 'transparent',
          }),
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: ({ theme }) => ({
            marginTop: '4px',
            padding: '0 8px',
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.divider}`,
            backgroundImage: 'none',
            boxShadow:
              'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
            '& .MuiMenuItem-root': {
              borderRadius: 6,
              padding: '6px 8px',
            },
            '& .MuiMenu-list': {
              '& .MuiDivider-root': { margin: '0 -8px' },
            },
            ...theme.applyStyles('dark', {
              boxShadow:
                'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
            }),
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.text.primary,
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.divider}`,
            transition: 'border 120ms ease-in',
            '&:hover': {
              borderColor: gray[400],
            },
            '&.Mui-focused': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
              borderColor: brand[400],
            },
            ...theme.applyStyles('dark', {
              '&:hover': {
                borderColor: gray[500],
              },
            }),
            variants: [
              {
                props: {
                  size: 'small',
                },
                style: {
                  height: '2rem',
                  padding: '0 0.5rem',
                },
              },
              {
                props: {
                  size: 'medium',
                },
                style: {
                  height: '2.5rem',
                },
              },
            ],
          }),
          notchedOutline: {
            border: 'none',
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: '10px',
            boxShadow: `0 4px 16px ${alpha(gray[400], 0.2)}`,
            '& .Mui-selected': {
              color: brand[500],
            },
            ...theme.applyStyles('dark', {
              '& .Mui-selected': {
                color: '#fff',
              },
              boxShadow: `0 4px 16px ${alpha(brand[700], 0.5)}`,
            }),
          }),
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            padding: '12px 16px',
            textTransform: 'none',
            borderRadius: '10px',
            fontWeight: 500,
            ...theme.applyStyles('dark', {
              color: gray[400],
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
              '&.Mui-selected': { color: brand[300] },
            }),
          }),
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: { minHeight: 'fit-content' },
          indicator: ({ theme }) => ({
            backgroundColor: theme.palette.grey[800],
            ...theme.applyStyles('dark', {
              backgroundColor: theme.palette.grey[200],
            }),
          }),
        },
      },
      MuiTab: {
        styleOverrides: {
          root: ({ theme }) => ({
            padding: '6px 8px',
            marginBottom: '8px',
            textTransform: 'none',
            minWidth: 'fit-content',
            minHeight: 'fit-content',
            color: theme.palette.text.secondary,
            borderRadius: theme.shape.borderRadius,
            border: '1px solid',
            borderColor: 'transparent',
            ':hover': {
              color: theme.palette.text.primary,
              backgroundColor: gray[100],
              borderColor: gray[200],
            },
            '&.Mui-selected': {
              color: gray[900],
            },
            ...theme.applyStyles('dark', {
              ':hover': {
                color: theme.palette.text.primary,
                backgroundColor: gray[800],
                borderColor: gray[700],
              },
              '&.Mui-selected': {
                color: '#fff',
              },
            }),
          }),
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.grey[500],
            ...theme.applyStyles('dark', {
              color: theme.palette.grey[400],
            }),
          }),
        },
      },
      MuiPickersPopper: {
        styleOverrides: {
          paper: ({ theme }) => ({
            marginTop: 4,
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.divider}`,
            backgroundImage: 'none',
            boxShadow:
              'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
            '& .MuiMenuItem-root': { borderRadius: 6, margin: '0 6px' },
            ...theme.applyStyles('dark', {
              boxShadow:
                'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
            }),
          }),
        },
      },
      MuiPickersArrowSwitcher: {
        styleOverrides: {
          button: ({ theme }) => ({
            color: theme.palette.grey[500],
            ...theme.applyStyles('dark', {
              color: theme.palette.grey[400],
            }),
          }),
        },
      },
      MuiPickersCalendarHeader: {
        styleOverrides: {
          switchViewButton: {
            padding: 0,
            border: 'none',
          },
        },
      },
      MuiPickersMonth: {
        styleOverrides: {
          monthButton: ({ theme }) => ({
            fontSize: theme.typography.body1.fontSize,
            color: theme.palette.grey[600],
            padding: theme.spacing(0.5),
            borderRadius: theme.shape.borderRadius,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            '&.Mui-selected': {
              backgroundColor: gray[700],
            },
            '&:focus': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
              backgroundColor: 'transparent',
              '&.Mui-selected': { backgroundColor: gray[700] },
            },
            ...theme.applyStyles('dark', {
              color: theme.palette.grey[500],
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              '&.Mui-selected': {
                color: theme.palette.common.black,
                backgroundColor: gray[300],
              },
              '&:focus': {
                outline: `3px solid ${alpha(brand[500], 0.5)}`,
                outlineOffset: '2px',
                backgroundColor: 'transparent',
                '&.Mui-selected': { backgroundColor: gray[300] },
              },
            }),
          }),
        },
      },
      MuiPickersYear: {
        styleOverrides: {
          yearButton: ({ theme }) => ({
            fontSize: theme.typography.body1.fontSize,
            color: theme.palette.grey[600],
            padding: theme.spacing(0.5),
            borderRadius: theme.shape.borderRadius,
            height: 'fit-content',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            '&.Mui-selected': {
              backgroundColor: gray[700],
            },
            '&:focus': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
              backgroundColor: 'transparent',
              '&.Mui-selected': { backgroundColor: gray[700] },
            },
            ...theme.applyStyles('dark', {
              color: theme.palette.grey[500],
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              '&.Mui-selected': {
                color: theme.palette.common.black,
                backgroundColor: gray[300],
              },
              '&:focus': {
                outline: `3px solid ${alpha(brand[500], 0.5)}`,
                outlineOffset: '2px',
                backgroundColor: 'transparent',
                '&.Mui-selected': { backgroundColor: gray[300] },
              },
            }),
          }),
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: ({ theme }) => ({
            fontSize: theme.typography.body1.fontSize,
            color: theme.palette.grey[600],
            padding: theme.spacing(0.5),
            borderRadius: theme.shape.borderRadius,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            '&.Mui-selected': {
              backgroundColor: gray[700],
            },
            '&:focus': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
              backgroundColor: 'transparent',
              '&.Mui-selected': { backgroundColor: gray[700] },
            },
            ...theme.applyStyles('dark', {
              color: theme.palette.grey[500],
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              '&.Mui-selected': {
                color: theme.palette.common.black,
                backgroundColor: gray[300],
              },
              '&:focus': {
                outline: `3px solid ${alpha(brand[500], 0.5)}`,
                outlineOffset: '2px',
                backgroundColor: 'transparent',
                '&.Mui-selected': { backgroundColor: gray[300] },
              },
            }),
          }),
        },
      },
      MuiChartsAxis: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& .MuiChartsAxis-line': {
              stroke: gray[300],
            },
            '& .MuiChartsAxis-tick': {
              stroke: gray[300],
            },
            '& .MuiChartsAxis-tickLabel': {
              fill: gray[400],
              fontWeight: 500,
            },
            ...theme.applyStyles('dark', {
              '& .MuiChartsAxis-line': {
                stroke: gray[700],
              },
              '& .MuiChartsAxis-tick': {
                stroke: gray[700],
              },
              '& .MuiChartsAxis-tickLabel': {
                fill: gray[400],
                fontWeight: 500,
              },
            }),
          }),
        },
      },
      MuiChartsLegend: {
        styleOverrides: {
          root: {
            '& .MuiChartsLegend-mark': {
              ry: 6,
            },
          },
        },
      },
      MuiChartsGrid: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& .MuiChartsGrid-line': {
              stroke: gray[200],
              strokeDasharray: '4 2',
              strokeWidth: 0.8,
            },
            ...theme.applyStyles('dark', {
              '& .MuiChartsGrid-line': {
                stroke: gray[700],
                strokeDasharray: '4 2',
                strokeWidth: 0.8,
              },
            }),
          }),
        },
      },
      MuiTreeItem2: {
        styleOverrides: {
          root: ({ theme }) => ({
            position: 'relative',
            boxSizing: 'border-box',
            padding: theme.spacing(0, 1),
            '& .groupTransition': {
              marginLeft: theme.spacing(2),
              padding: theme.spacing(0),
              borderLeft: '1px solid',
              borderColor: theme.palette.divider,
            },
          }),
          content: ({ theme }) => ({
            marginTop: theme.spacing(1),
            padding: theme.spacing(0.5, 1),
            overflow: 'clip',
            '&:hover': {
              backgroundColor: alpha(gray[300], 0.2),
            },
            '&.focused': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
              '&:hover': {
                backgroundColor: alpha(gray[300], 0.2),
                outline: `3px solid ${alpha(brand[500], 0.5)}`,
                outlineOffset: '2px',
              },
            },
            '&.selected': {
              backgroundColor: alpha(gray[300], 0.4),
              '&:hover': {
                backgroundColor: alpha(gray[300], 0.6),
              },
            },
            ...theme.applyStyles('dark', {
              '&:hover': {
                backgroundColor: alpha(gray[500], 0.2),
              },
              '&:focus-visible': {
                '&:hover': {
                  backgroundColor: alpha(gray[500], 0.2),
                },
              },
              '&.selected': {
                backgroundColor: alpha(gray[500], 0.4),
                '&:hover': {
                  backgroundColor: alpha(gray[500], 0.6),
                },
              },
            }),
          }),
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          actions: {
            display: 'flex',
            gap: 8,
            marginRight: 6,
            '& .MuiIconButton-root': { minWidth: 0, width: 36, height: 36 },
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: theme.palette.divider,
          }),
          cell: ({ theme }) => ({ borderTopColor: theme.palette.divider }),
          menu: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.divider}`,
            backgroundImage: 'none',
            boxShadow:
              'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
            '& .MuiMenuItem-root': {
              borderRadius: theme.shape.borderRadius,
              margin: '0 6px',
            },
            ...theme.applyStyles('dark', {
              boxShadow:
                'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
            }),
          }),
          row: ({ theme }) => ({
            // borderBottom: `1px solid ${theme.palette.divider}`,
            '&:last-of-type': { borderBottom: `1px solid ${theme.palette.divider}` },
            '&:hover': {
              background: alpha(theme.palette.primary.main, 0.1),
            },
            '&.Mui-selected': {
              background: theme.palette.grey[100],
              '&:hover': {
                background: alpha(theme.palette.primary.main, 0.2),
              },
            },
            '&.even': {
              background: alpha(theme.palette.grey[200], 0.3),
              '&:hover': {
                background: alpha(theme.palette.primary.main, 0.1),
              },
              '&.Mui-selected': {
                background: theme.palette.grey[100],
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.2),
                },
              },
            },
            ...theme.applyStyles('dark', {
              backgroundColor: theme.palette.grey[900],
              '&.Mui-selected': {
                background: theme.palette.grey[800],
              },
              '&.even': {
                background: alpha(theme.palette.grey[800], 0.4),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.1),
                },
                '&.Mui-selected': {
                  background: theme.palette.grey[800],
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.2),
                  },
                },
              },
            }),
          }),
          iconButtonContainer: ({ theme }) => ({
            '& .MuiIconButton-root': {
              border: 'none',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: gray[100],
              },
              '&:active': {
                backgroundColor: gray[200],
              },
              ...theme.applyStyles('dark', {
                color: gray[50],
                '&:hover': {
                  backgroundColor: gray[800],
                },
                '&:active': {
                  backgroundColor: gray[900],
                },
              }),
            },
          }),
          menuIconButton: ({ theme }) => ({
            border: 'none',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: gray[100],
            },
            '&:active': {
              backgroundColor: gray[200],
            },
            ...theme.applyStyles('dark', {
              color: gray[50],
              '&:hover': {
                backgroundColor: gray[800],
              },
              '&:active': {
                backgroundColor: gray[900],
              },
            }),
          }),
          columnHeaderTitleContainer: {
            flexGrow: 1,
            justifyContent: 'space-between',
          },
          columnHeaderDraggableContainer: { paddingRight: 2 },
        },
      },
    },
  };
}
