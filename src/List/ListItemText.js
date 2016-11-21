// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import Text from '../Text';

export const styleSheet = createStyleSheet('ListItemText', () => {
  return {
    root: {
      flex: '1 1 auto',
      padding: '0 16px',
      '&:first-child': {
        paddingLeft: 0,
      },
    },
  };
});

export default function ListItemText(props, context) {
  const {
    className: classNameProp,
    primary,
    secondary,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.root, classNameProp);

  return (
    <div className={className} {...other}>
      {primary && (
        typeof primary === 'string' ? (
          <Text type="subheading">
            {primary}
          </Text>
        ) : primary
      )}
      {secondary && (
        typeof secondary === 'string' ? (
          <Text secondary type="body1">
            {secondary}
          </Text>
        ) : secondary
      )}
    </div>
  );
}

ListItemText.propTypes = {
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  primary: PropTypes.node,
  secondary: PropTypes.node,
};

ListItemText.defaultProps = {
  primary: false,
  secondary: false,
};

ListItemText.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
