import { createBox } from '@mui/system';
import PropTypes from 'prop-types';
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

Box.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
} as any;

export default Box;
