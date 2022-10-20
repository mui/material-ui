import { createStyled } from '@mui/system';
import { Theme } from './Theme.types';
import defaultTheme from './defaultTheme';
// TODO: custom styleFunctionSx will be required
// import styleFunctionSx from './styleFunctionSx';

const styled = createStyled<Theme>({ defaultTheme /* styleFunctionSx */ });

export default styled;
