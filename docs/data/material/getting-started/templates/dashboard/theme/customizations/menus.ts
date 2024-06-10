import { Components } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { gray } from '../themePrimitives';

export const menuComponentsCustomizations: Components<Theme> = {
  MuiList: {
    styleOverrides: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        padding: '4px 8px',
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
  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        marginTop: '4px',
        padding: '4px 0',
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        backgroundImage: 'none',
        background: 'hsl(0, 0%, 100%)',
        boxShadow:
          'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
        '& .MuiMenuItem-root': {
          borderRadius: theme.shape.borderRadius,
          padding: '6px 8px',
        },
        '& .MuiMenu-list': {
          '& .MuiDivider-root': { margin: '0 -8px' },
        },
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
};
