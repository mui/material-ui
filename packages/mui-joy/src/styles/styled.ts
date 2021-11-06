import { createStyled } from '@mui/system';
import defaultTheme, { JoyTheme } from './defaultTheme';
import { ExtendedColorScheme } from './CssVarsProvider';

const styled = createStyled<JoyTheme<ExtendedColorScheme>>({ defaultTheme });

export default styled;
