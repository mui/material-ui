import { Theme, Components } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { iconButtonClasses } from '@mui/material/IconButton';

/* eslint-disable import/prefer-default-export */
export const inputCustomizations: Components<Theme> = {
  MuiInputBase: {
    styleOverrides: {
      root: {
        border: 'none',
        marginTop: 6,
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        transform: 'translate(4px, -11px) scale(0.75)',
        [`&.${outlinedInputClasses.focused}`]: {
          transform: 'translate(4px, -12px) scale(0.75)',
        },
      },
    },
  },
  MuiPickersInputBase: {
    styleOverrides: {
      root: ({ theme }) => ({
        marginTop: '6px',
        border: `1px solid ${theme.palette.divider}`,
        ' .MuiPickersInputBase-sectionsContainer': {
          padding: '10px 0',
        },
        ' .MuiPickersOutlinedInput-notchedOutline': {
          border: 0,
        },
        [` .${iconButtonClasses.root}`]: {
          border: 0,
          height: '34px',
          width: '34px',
        },
      }),
    },
  },
};
