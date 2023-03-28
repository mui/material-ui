import { createStyled } from '@mui/system';
import { Theme } from './types';
import defaultTheme from './defaultTheme';
import IDENTIFIER from './identifier';

const styled = createStyled<Theme>({ defaultTheme, identifier: IDENTIFIER });

export default styled;
