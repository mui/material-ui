import { createStyled, shouldForwardProp } from '@mui/system';
import defaultTheme from './defaultTheme';

export const rootShouldForwardProp = (prop) => shouldForwardProp(prop) && prop !== 'classes';

export const slotShouldForwardProp = shouldForwardProp;

const styled = createStyled({
  identifier: '$$material',
  defaultTheme,
  rootShouldForwardProp,
});

export default styled;
