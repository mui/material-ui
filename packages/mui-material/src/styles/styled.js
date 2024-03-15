'use client';
import createStyled from '@mui/system/createStyled';
import defaultTheme from './defaultTheme';
import THEME_ID from './identifier';
import rootShouldForwardProp from './rootShouldForwardProp';

export { default as slotShouldForwardProp } from './slotShouldForwardProp';
export { default as rootShouldForwardProp } from './rootShouldForwardProp';

const styled = createStyled({
  themeId: THEME_ID,
  defaultTheme,
  rootShouldForwardProp,
});

export default styled;
