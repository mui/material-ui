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
    inset: {
      '&:first-child': {
        paddingLeft: 56,
      },
    },
  };
});

export default function ListItemText(props, context) {
  const {
    className: classNameProp,
    primary,
    secondary,
    inset,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.root, {
    [classes.inset]: inset,
  }, classNameProp);

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
  /**
   * If true, the children will be indented by 72px. This is useful if there is no left avatar or left icon.
   */
  inset: PropTypes.bool,
  primary: PropTypes.node,
  secondary: PropTypes.node,
};

ListItemText.defaultProps = {
  primary: false,
  secondary: false,
  inset: false,
};

ListItemText.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
