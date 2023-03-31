import { createStyled, shouldForwardProp } from '@mui/system';
import defaultTheme from './defaultTheme';
import THEME_ID from './identifier';

export const rootShouldForwardProp = (prop) => shouldForwardProp(prop) && prop !== 'classes';

export const slotShouldForwardProp = shouldForwardProp;

const styled = createStyled({
  identifier: THEME_ID,
  defaultTheme,
  rootShouldForwardProp,
});

export default styled;
