import { useThemeProps as systemUseThemeProps } from '@mui/system';
import defaultTheme from './defaultTheme';
import THEME_ID from './identifier';

export default function useThemeProps({ props, name, shallowMergePropNames = [] }) {
  return systemUseThemeProps({
    props,
    name,
    defaultTheme,
    shallowMergePropNames,
    themeId: THEME_ID,
  });
}
