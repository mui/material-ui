import getThemeProps from './getThemeProps';
import { useTheme } from '../createBox';
import createTheme from '../createTheme';

const systemDefaultTheme = createTheme();

export default function useThemeProps({ props, name, defaultTheme = systemDefaultTheme }) {
  const contextTheme = useTheme(defaultTheme);
  const more = getThemeProps({ theme: contextTheme, name, props });
  const theme = more.theme || contextTheme;

  return {
    theme,
    isRtl: theme.direction === 'rtl',
    ...more,
  };
}
