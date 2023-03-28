import getThemeProps from './getThemeProps';
import useTheme from '../useTheme';

export default function useThemeProps({ props, name, defaultTheme, identifier }) {
  const theme = useTheme(defaultTheme);
  const mergedProps = getThemeProps({ theme: theme[identifier] || theme, name, props });
  return mergedProps;
}
