'use client';
import createStyled, { shouldForwardProp } from '@mui/system/createStyled';
import defaultTheme from './defaultTheme';
import THEME_ID from './identifier';
export { default as slotShouldForwardProp } from './slotShouldForwardProp';

export const rootShouldForwardProp = (prop) => shouldForwardProp(prop) && prop !== 'classes';

const styled = createStyled({
  themeId: THEME_ID,
  defaultTheme,
  rootShouldForwardProp,
});

export default styled;
