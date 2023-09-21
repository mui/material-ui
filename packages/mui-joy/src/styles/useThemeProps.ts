'use client';
import { useThemeProps as systemUseThemeProps } from '@mui/system';
import defaultTheme from './defaultTheme';
import THEME_ID from './identifier';

export default function useThemeProps<T extends {}>({
  props,
  name,
}: {
  props: T & {};
  name: string;
}) {
  return systemUseThemeProps({
    props,
    name,
    defaultTheme: { ...defaultTheme, components: {} },
    themeId: THEME_ID,
  });
}
