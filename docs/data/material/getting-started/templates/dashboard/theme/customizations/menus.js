import * as React from 'react';

import { alpha } from '@mui/material/styles';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { gray } from '../themePrimitives';

export const menuComponentsCustomizations = {
  MuiList: {
    styleOverrides: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        padding: '4px',
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: 4,
        '.MuiSvgIcon-root': {
          width: '1.25rem',
          height: '1.25rem',
          color: theme.palette.text.secondary,
        },
        '.MuiTypography-root': {
          fontWeight: 500,
        },
        '.MuiButtonBase-root': {
          padding: '2px 8px',
          borderRadius: theme.shape.borderRadius,
          opacity: 0.7,
          '&.Mui-selected': {
            opacity: 1,
            backgroundColor: theme.palette.action.selected,
            '.MuiSvgIcon-root': {
              color: theme.palette.text.primary,
            },
          },
        },
      }),
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 0,
        marginRight: 8,
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        padding: '6px 8px',
      }),
    },
  },
  MuiMenu: {
    styleOverrides: {
      list: { gap: '4px', '& .MuiDivider-root': { margin: '0 -8px' } },
      paper: ({ theme }) => ({
        marginTop: '4px',
        padding: '0 4px',
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        backgroundImage: 'none',
        background: 'hsl(0, 0%, 100%)',
        boxShadow:
          'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
        ...theme.applyStyles('dark', {
          background: gray[900],
          boxShadow:
            'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
        }),
      }),
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
      }),
    },
  },
  MuiSelect: {
    defaultProps: {
      IconComponent: React.forwardRef((props, ref) => (
        <UnfoldMoreRoundedIcon {...props} ref={ref} />
      )),
    },
    styleOverrides: {
      root: ({ theme }) => ({
        '&.MuiFilledInput-root': {
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `inset 0 2px 0 hsl(220, 0%, 100%), inset 0 -2px 0 ${gray[100]}`,
          '&:hover': {
            borderColor: gray[300],
          },
          '&:focus-visible': {
            outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
            outlineOffset: '2px',
          },
          '&:before, &:after': {
            display: 'none',
          },
        },
        '& .MuiSelect-select': {
          display: 'flex',
          alignItems: 'center',
          padding: theme.spacing(1, 2),
        },
        ...theme.applyStyles('dark', {
          '&.MuiFilledInput-root': {
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
            boxShadow: `inset 0 2px 0 ${alpha(gray[700], 0.3)}, inset 0 -2px 0 hsl(220, 0%, 0%)`,
            '&:hover': {
              borderColor: gray[600],
            },
            '&:focus-visible': {
              outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
              outlineOffset: '2px',
            },
            '&:before, &:after': {
              display: 'none',
            },
          },
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(1, 2),
          },
        }),
      }),
    },
  },
};
