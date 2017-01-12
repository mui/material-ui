// @flow weak

import React, { PropTypes } from 'react';

export default function ListItemSecondaryAction(props) {
  const {
    children,
    className,
  } = props;

  return (
    <div className={className}>
      {children}
    </div>
  );
}

ListItemSecondaryAction.propTypes = {
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};

ListItemSecondaryAction.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';
