import { Theme } from '@mui/material/styles';

declare module '@mui/icons-material/utils/SvgIcon' {
  interface SvgIconThemeOverrides extends Theme {}
}

// disable automatic export
export {};
