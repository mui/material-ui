import { createStyled } from '@mui/system';
import defaultTheme, { JoyTheme } from './defaultTheme';

const styled = createStyled<JoyTheme>({ defaultTheme } as {
  defaultTheme: JoyTheme;
});

export default styled;
