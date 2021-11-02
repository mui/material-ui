import { createStyled, shouldForwardProp } from '@mui/system';
import defaultTheme, { JoyTheme } from './defaultTheme';

export const rootShouldForwardProp = (prop: string) =>
  shouldForwardProp(prop) && prop !== 'classes';

const styled = createStyled<JoyTheme>({ defaultTheme });

export default styled;
