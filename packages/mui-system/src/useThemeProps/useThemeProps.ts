'use client';
import getThemeProps from './getThemeProps';
import useTheme from '../useTheme';

export default function useThemeProps({ props, name, defaultTheme, themeId }: any): any {
  let theme = useTheme(defaultTheme);
  if (themeId) {
    theme = theme[themeId] || theme;
  }
  return getThemeProps({ theme, name, props });
}
