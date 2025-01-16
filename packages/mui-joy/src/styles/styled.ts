import { createStyled } from '@mui/system';
import type { Theme } from './types';
import defaultTheme from './defaultTheme';
import THEME_ID from './identifier';

const styled = createStyled<Theme>({ defaultTheme, themeId: THEME_ID });

export default styled;
