import createTheme from './createTheme';
import useThemeWithoutDefault from './useThemeWithoutDefault';

export const systemDefaultTheme = createTheme();

function useTheme(defaultTheme = systemDefaultTheme, identifier = undefined) {
  return useThemeWithoutDefault(defaultTheme, identifier);
}

export default useTheme;
