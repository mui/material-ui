import { createStyled, shouldForwardProp } from '@material-ui/system';
import defaultTheme from './defaultTheme';

export const rootShouldForwardProp = (prop) => shouldForwardProp(prop) && prop !== 'classes';

export const slotShouldForwardProp = shouldForwardProp;

const experimentalStyled = createStyled({
  defaultTheme,
  rootShouldForwardProp,
});

export default experimentalStyled;
