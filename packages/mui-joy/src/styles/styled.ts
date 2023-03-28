import { createStyled } from '@mui/system';
import { Theme } from './types';
import defaultTheme from './defaultTheme';

const styled = createStyled<Theme>({ defaultTheme, identifier: '$$joy' });

export default styled;
