'use client';
import createTheme from '../createTheme';
import useThemeWithoutDefault from '../useThemeWithoutDefault';
import { Theme } from '../createTheme';

export const systemDefaultTheme = createTheme();

function useTheme<T = Theme>(defaultTheme: T = systemDefaultTheme as any): T {
  return useThemeWithoutDefault(defaultTheme);
}

export default useTheme;
