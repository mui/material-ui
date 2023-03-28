import { useThemeProps as systemUseThemeProps } from '@mui/system';
import defaultTheme from './defaultTheme';
import IDENTIFIER from './identifier';

export default function useThemeProps({ props, name }) {
  return systemUseThemeProps({ props, name, defaultTheme, identifier: IDENTIFIER });
}
