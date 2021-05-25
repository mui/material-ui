import * as React from 'react';
import PropTypes from 'prop-types';
import SystemBox from '@material-ui/system/Box';
import { useTheme } from '../styles';

const Box = React.forwardRef((props, ref) => {
  const theme = useTheme();

  return <SystemBox {...props} theme={theme} ref={ref} />;
});

Box.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
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
   * @ignore
   */
  sx: PropTypes.object,
};

export default Box;
