import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme } from '../styles';
import SystemBox from '@material-ui/system/Box';

const defaultTheme = createTheme();

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const Box = (props) => {
  return (
    <SystemBox
      {...props}
      theme={!props.theme || isEmpty(props.theme) ? defaultTheme : props.theme}
    />
  );
};

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
