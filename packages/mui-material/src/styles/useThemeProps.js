'use client';
import systemUseThemeProps from '@mui/system/useThemeProps';
import defaultTheme from './defaultTheme';
import THEME_ID from './identifier';

export default function useThemeProps({ props, name }) {
  return systemUseThemeProps({ props, name, defaultTheme, themeId: THEME_ID });
}
