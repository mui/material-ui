// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'stylishly/lib/styleSheet';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('ListItemIcon', () => {
  return {
    root: {
      flex: '0 0 40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 16px',
      '&:first-child': {
        marginLeft: 0,
      },
    },
  };
});

export default function ListItemIcon(props, context) {
  const {
    children,
    className: classNameProp,
  } = props;
  const classes = context.styleManager.render(styleSheet, { group: 'mui' });
  const className = classNames(classes.root, classNameProp);

  return (
    <div className={className}>
      {children}
    </div>
  );
}

ListItemIcon.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

ListItemIcon.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
