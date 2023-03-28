import { createStyled, shouldForwardProp } from '@mui/system';
import defaultTheme from './defaultTheme';
import IDENTIFIER from './identifier';

export const rootShouldForwardProp = (prop) => shouldForwardProp(prop) && prop !== 'classes';

export const slotShouldForwardProp = shouldForwardProp;

const styled = createStyled({
  identifier: IDENTIFIER,
  defaultTheme,
  rootShouldForwardProp,
});

export default styled;
