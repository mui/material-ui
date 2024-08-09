import * as React from 'react';
import { alpha } from '@mui/material/styles';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { typographyClasses } from '@mui/material/Typography';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { dividerClasses } from '@mui/material/Divider';
import { listItemButtonClasses } from '@mui/material/ListItemButton';
import { menuItemClasses } from '@mui/material/MenuItem';
import { selectClasses } from '@mui/material/Select';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { gray } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const menuComponentsCustomizations = {
  MuiList: {
    styleOverrides: {
      root: {
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`& .${svgIconClasses.root}`]: {
          width: '1rem',
          height: '1rem',
          color: theme.palette.text.secondary,
        },
        [`& .${typographyClasses.root}`]: {
          fontWeight: 500,
        },
        [`& .${buttonBaseClasses.root}`]: {
          display: 'flex',
          gap: 8,
          padding: '2px 8px',
          borderRadius: theme.shape.borderRadius,
          opacity: 0.7,
          [`&.${listItemButtonClasses.selected}`]: {
            opacity: 1,
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
            [`& .${svgIconClasses.root}`]: {
              color: theme.palette.text.primary,
            },
            [`&.${listItemButtonClasses.focusVisible}`]: {
              backgroundColor: alpha(theme.palette.action.selected, 0.3),
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.action.selected, 0.5),
            },
          },
          [`&.${listItemButtonClasses.focusVisible}`]: {
            backgroundColor: 'transparent',
          },
        },
      }),
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: ({ theme }) => ({
        fontSize: theme.typography.body2.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.body2.lineHeight,
      }),
      secondary: ({ theme }) => ({
        fontSize: theme.typography.caption.fontSize,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiListSubheader: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: 'transparent',
        padding: '4px 8px',
        fontSize: theme.typography.caption.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 0,
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        padding: '6px 8px',
        [`&.${menuItemClasses.focusVisible}`]: {
          backgroundColor: 'transparent',
        },
        [`&.${menuItemClasses.selected}`]: {
          [`&.${menuItemClasses.focusVisible}`]: {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
        },
      }),
    },
  },
  MuiMenu: {
    styleOverrides: {
      list: {
        gap: '0px',
        [`&.${dividerClasses.root}`]: {
          margin: '0 -8px',
        },
      },
      paper: ({ theme }) => ({
        marginTop: '4px',
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        backgroundImage: 'none',
        background: 'hsl(0, 0%, 100%)',
        boxShadow:
          'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
        [`& .${buttonBaseClasses.root}`]: {
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
        },
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
      IconComponent: React.forwardRef((props, ref) => (
        <UnfoldMoreRoundedIcon fontSize="small" {...props} ref={ref} />
      )),
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        border: '1px solid',
        borderColor: gray[200],
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset 0 1px 0 1px hsla(220, 0%, 100%, 0.6), inset 0 -1px 0 1px hsla(220, 35%, 90%, 0.5)`,
        '&:hover': {
          borderColor: gray[300],
          backgroundColor: theme.palette.background.paper,
          boxShadow: 'none',
        },
        [`&.${selectClasses.focused}`]: {
          outlineOffset: 0,
          borderColor: gray[400],
        },
        '&:before, &:after': {
          display: 'none',
        },
        ...theme.applyStyles('dark', {
          borderRadius: theme.shape.borderRadius,
          borderColor: gray[700],
          backgroundColor: theme.palette.background.paper,
          boxShadow: `inset 0 1px 0 1px ${alpha(gray[700], 0.15)}, inset 0 -1px 0 1px hsla(220, 0%, 0%, 0.7)`,
          '&:hover': {
            borderColor: alpha(gray[700], 0.7),
            backgroundColor: theme.palette.background.paper,
            boxShadow: 'none',
          },
          [`&.${selectClasses.focused}`]: {
            outlineOffset: 0,
            borderColor: gray[900],
          },
          '&:before, &:after': {
            display: 'none',
          },
        }),
      }),
      select: ({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        ...theme.applyStyles('dark', {
          display: 'flex',
          alignItems: 'center',
          '&:focus-visible': {
            backgroundColor: gray[900],
          },
        }),
      }),
    },
  },
};
