import PropTypes from 'prop-types';
import createBox from '../createBox';

const Box = createBox();

Box.propTypes /* remove-proptypes */ = {
  // --------------------------------- Warning ---------------------------------
  // | The propTypes for the system components are NOT automatically generated |
  // |  If you are updating the props, make sure to update the propTypes too   |
  // ---------------------------------------------------------------------------
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
};

export default Box;
