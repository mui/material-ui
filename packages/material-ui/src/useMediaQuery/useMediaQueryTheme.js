import useThemeProps from '@material-ui/styles/useThemeProps';
import useMediaQuery from './useMediaQuery';

function useMediaQueryTheme(query, options = {}) {
  const options2 = useThemeProps(options, { name: 'MuiUseMediaQuery' });
  return useMediaQuery(query, options2);
}

export default useMediaQueryTheme;
