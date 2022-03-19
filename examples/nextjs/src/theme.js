import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const LIGHT = 'light';
export const DARK = 'dark';

const palette = {
  mode: LIGHT,
  primary: {
    main: '#556cd6',
  },
  secondary: {
    main: '#19857b',
  },
  error: {
    main: red.A400,
  },
};

export const lightTheme = createTheme({
  palette: { ...palette, mode: LIGHT },
});

export const darkTheme = createTheme({
  palette: { ...palette, mode: DARK },
});
