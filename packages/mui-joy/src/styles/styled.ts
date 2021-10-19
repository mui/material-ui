import { createStyled } from '@mui/system';
import { useTheme } from './ThemeProvider';
import defaultTheme from './defaultTheme';

export default function styled() {
  return createStyled({ useTheme, defaultTheme });
}
