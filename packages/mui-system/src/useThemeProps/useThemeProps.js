import getThemeProps from './getThemeProps';
import useTheme from '../useTheme';

export default function useThemeProps({ props, name, defaultTheme, identifier }) {
  let theme = useTheme(defaultTheme);
  if (identifier) {
    theme = theme[identifier] || theme;
  }
  const mergedProps = getThemeProps({ theme, name, props });
  return mergedProps;
}
