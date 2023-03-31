import getThemeProps from './getThemeProps';
import useTheme from '../useTheme';

export default function useThemeProps({ props, name, defaultTheme, themeId }) {
  let theme = useTheme(defaultTheme);
  if (themeId) {
    theme = theme[themeId] || theme;
  }
  const mergedProps = getThemeProps({ theme, name, props });
  return mergedProps;
}
