import { useThemeProps as systemUseThemeProps } from '@mui/system';
import defaultTheme from './defaultTheme';

export default function useThemeProps({ props, name, shallowMergePropNames = [] }) {
  return systemUseThemeProps({ props, name, defaultTheme, shallowMergePropNames });
}
