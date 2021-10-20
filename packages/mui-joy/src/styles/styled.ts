import { createStyled } from '@mui/system';
import { useTheme } from './ThemeProvider';
import defaultTheme, { JoyTheme } from './defaultTheme';

const styled = createStyled<JoyTheme>({ defaultTheme, useTheme });

export default styled;
