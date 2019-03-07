import { useTheme, getThemeProps } from '@material-ui/styles';
import useMediaQuery from './useMediaQuery';

function useMediaQueryTheme(query, options) {
  const theme = useTheme();
  const props = getThemeProps({
    theme,
    name: 'MuiUseMediaQuery',
    props: {},
  });

  return useMediaQuery(query, { ...props, ...options });
}

export default useMediaQueryTheme;
