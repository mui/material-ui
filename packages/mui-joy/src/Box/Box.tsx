import { createBox } from '@mui/system';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '../className';
import { BoxTypeMap } from './BoxProps';
import defaultTheme from '../styles/defaultTheme';
import styleFunctionSx from '../styles/styleFunctionSx';

const Box = createBox({
  defaultTheme,
  defaultClassName: 'JoyBox-root',
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
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default Box;
