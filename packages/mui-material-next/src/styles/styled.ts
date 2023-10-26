import { createStyled, shouldForwardProp } from '@mui/system';
import { THEME_ID } from '@mui/material/styles';
import { Theme } from './Theme.types';
import defaultTheme from './defaultTheme';

export const rootShouldForwardProp = (prop: PropertyKey) =>
  shouldForwardProp(prop) && prop !== 'classes';

const styled = createStyled<Theme>({ defaultTheme, themeId: THEME_ID, rootShouldForwardProp });

export default styled;
