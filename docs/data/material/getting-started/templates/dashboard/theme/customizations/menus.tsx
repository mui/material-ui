import * as React from 'react';
import { Components, SvgIconProps } from '@mui/material';
import { Theme, alpha } from '@mui/material/styles';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { gray } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const menuComponentsCustomizations: Components<Theme> = {
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
          width: '1rem',
          height: '1rem',
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
  MuiSelect: {
    defaultProps: {
      IconComponent: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
        <UnfoldMoreRoundedIcon fontSize="small" {...props} ref={ref} />
      )),
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset 0 1px 0 1px hsla(220, 0%, 100%, 0.6), inset 0 -1px 0 1px hsla(220, 35%, 90%, 0.5)`,
        '&:hover': {
          borderColor: gray[300],
          backgroundColor: theme.palette.background.paper,
          boxShadow: 'none',
        },

        '&:before, &:after': {
          display: 'none',
        },

        ...theme.applyStyles('dark', {
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `inset 0 1px 0 1px ${alpha(gray[700], 0.15)}, inset 0 -1px 0 1px hsla(220, 0%, 0%, 0.7)`,
          '&:hover': {
            borderColor: alpha(gray[700], 0.7),
            backgroundColor: theme.palette.background.paper,
            boxShadow: 'none',
          },

          '&:before, &:after': {
            display: 'none',
          },
        }),
      }),
      select: ({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1, 2),
        '&:focus-visible': {
          borderRadius: theme.shape.borderRadius,
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: '2px',
          boxShadow: 'none',
          backgroundColor: gray[100],
        },
        ...theme.applyStyles('dark', {
          display: 'flex',
          alignItems: 'center',
          padding: theme.spacing(1, 2),
          '&.focus-visible': {
            borderRadius: theme.shape.borderRadius,
            outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
            outlineOffset: '2px',
            boxShadow: 'none',
            backgroundColor: gray[900],
          },
        }),
      }),
    },
  },
};
