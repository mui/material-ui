import { createStyled } from '@mui/system';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

const styled = createStyled({ defaultTheme: theme });

export default styled;