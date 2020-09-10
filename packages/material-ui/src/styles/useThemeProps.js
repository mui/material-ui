import useTheme from './useTheme';
import { getThemeProps } from '@material-ui/styles';
import defaultTheme from './defaultTheme';

export default function useThemeProps({ props: inputProps, name }) {
  const props = Object.assign({}, inputProps);

  const contextTheme = useTheme() || defaultTheme;

  const more = getThemeProps({ theme: contextTheme, name, props });

  const theme = more.theme || contextTheme;
  const isRtl = theme.direction === 'rtl';

  return {
    theme,
    isRtl,
    ...more,
  };
};