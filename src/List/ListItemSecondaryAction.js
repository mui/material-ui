// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('ListItemSecondaryAction', () => ({
  secondaryAction: {
    position: 'absolute',
    right: 4,
    top: '50%',
    marginTop: -24,
  },
}), { index: -3 });

export default function ListItemSecondaryAction(props, context) {
  const {
    children,
    className: classNameProp,
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.secondaryAction, classNameProp);

  return (
    <div className={className}>
      {children}
    </div>
  );
}

ListItemSecondaryAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

ListItemSecondaryAction.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';
