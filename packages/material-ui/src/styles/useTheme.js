import { useTheme as useThemeWithoutDefault } from '@material-ui/styles';
import defaultTheme from './defaultTheme';

export default function useTheme() {
  return useThemeWithoutDefault() || defaultTheme;
}
