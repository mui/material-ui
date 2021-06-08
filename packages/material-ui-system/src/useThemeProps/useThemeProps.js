import getThemeProps from './getThemeProps';
import useTheme from '../useTheme';

export default function useThemeProps({ props, name, defaultTheme }) {
  const contextTheme = useTheme(defaultTheme);
  const more = getThemeProps({ theme: contextTheme, name, props });
  const theme = more.theme || contextTheme;

  return {
    theme,
    isRtl: theme.direction === 'rtl',
    ...more,
  };
}
