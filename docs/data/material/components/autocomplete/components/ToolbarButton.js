import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';

function ToolbarButton(props) {
  const { className, children, ...other } = props;
  return <IconButton {...other}>{children}</IconButton>;
}

ToolbarButton.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  className: PropTypes.string,
};

export { ToolbarButton };
