'use client';
import getThemeProps from './getThemeProps';
import useTheme from '../useTheme';

export default function useThemeProps({ props, name, defaultTheme, themeId }) {
  let theme = useTheme(defaultTheme);
  if (themeId) {
    theme = theme[themeId] || theme;
  }
  return getThemeProps({ theme, name, props });
}
