import { createStyled } from '@mui/system';
import { Theme } from './types';
import defaultTheme from './defaultTheme';
import styleFunctionSx from './styleFunctionSx';

const styled = createStyled<Theme>({ defaultTheme, styleFunctionSx });

export default styled;
