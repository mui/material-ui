import { createBox } from '@mui/system';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '../utils';
import { createTheme } from '../styles';

const defaultTheme = createTheme();

/**
 * @ignore - do not document.
 */
const Box = createBox({
  defaultTheme,
  defaultClassName: 'MuiBox-root',
  generateClassName: ClassNameGenerator.generate,
});

export default Box;
