import { createStyled } from '@mui/system';
import defaultTheme, { JoyTheme } from './defaultTheme';
import styleFunctionSx from './styleFunctionSx';

const styled = createStyled<JoyTheme>({ defaultTheme, styleFunctionSx });

export default styled;
