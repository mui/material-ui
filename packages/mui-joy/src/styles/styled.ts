import { createStyled } from '@mui/system';
import defaultTheme, { JoyTheme } from './defaultTheme';
import { ExtendedColorScheme } from './CssVarsProvider';

const styled = createStyled<JoyTheme>({ defaultTheme } as {
  defaultTheme: JoyTheme;
});

export default styled;
