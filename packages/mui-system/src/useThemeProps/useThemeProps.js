import getThemeProps from './getThemeProps';
import useTheme from '../useTheme';

export default function useThemeProps({
  props,
  name,
  defaultTheme,
  themeId,
  shallowMergePropNames = [],
}) {
  let theme = useTheme(defaultTheme);
  if (themeId) {
    theme = theme[themeId] || theme;
  }
  const mergedProps = getThemeProps({ theme, name, props, shallowMergePropNames });
  return mergedProps;
}
