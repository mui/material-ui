import { createBox } from '@mui/system';
import { OverridableComponent } from '@mui/types';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '../className';
import { BoxTypeMap } from './BoxProps';
import defaultTheme from '../styles/defaultTheme';
import styleFunctionSx from '../styles/styleFunctionSx';

const Box = createBox({
  defaultTheme,
  defaultClassName: 'MuiBox-root',
  generateClassName: ClassNameGenerator.generate,
  styleFunctionSx,
}) as OverridableComponent<BoxTypeMap>;

export default Box;
