import useThemePropsWithoutDefault from '@material-ui/styles/useThemeProps';
import defaultTheme from './defaultTheme';

export default function useThemeProps(props, options) {
  return useThemePropsWithoutDefault(props, {
    defaultTheme,
    ...options,
  });
}
