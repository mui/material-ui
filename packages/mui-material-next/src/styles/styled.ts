import { createStyled } from '@mui/system';
import { THEME_ID } from '@mui/material/styles';
import { Theme } from './Theme.types';
import defaultTheme from './defaultTheme';

const styled = createStyled<Theme>({ defaultTheme, themeId: THEME_ID });

export default styled;
