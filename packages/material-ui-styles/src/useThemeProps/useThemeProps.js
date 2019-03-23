import useTheme from '../useTheme';
import getThemeProps from '../getThemeProps';

function useThemeProps(props, options) {
  const { defaultTheme, name } = options;
  const theme = useTheme() || defaultTheme;
  const output = getThemeProps({
    theme,
    name,
    props,
  });
  return output;
}

export default useThemeProps;
