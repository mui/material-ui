import { createStyled, shouldForwardProp } from '@material-ui/system';
import defaultTheme from './defaultTheme';

export const rootShouldForwardProp = (prop) => shouldForwardProp(prop) && prop !== 'classes';

export const slotShouldForwardProp = shouldForwardProp;

const styled = createStyled({
  defaultTheme,
  rootShouldForwardProp,
});

export default styled;
