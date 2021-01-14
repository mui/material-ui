import { getThemeProps } from '@material-ui/styles';
import useTheme from './useTheme';

export default function useThemeProps({ props: inputProps, name }) {
  const props = { ...inputProps };

  const contextTheme = useTheme();

  const more = getThemeProps({ theme: contextTheme, name, props });

  const theme = more.theme || contextTheme;
  const isRtl = theme.direction === 'rtl';

  return {
    theme,
    isRtl,
    ...more,
  };
}
