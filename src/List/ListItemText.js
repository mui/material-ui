// @flow weak

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import Text from '../Text';

export const styleSheet = createStyleSheet('MuiListItemText', () => {
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
    dense: {
      fontSize: '13px',
    },
  };
});

export default function ListItemText(props, context) {
  const {
    className: classNameProp,
    dense,
    primary,
    secondary,
    inset,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.root, {
    [classes.inset]: inset,
  }, classNameProp);

  const classNameText = classNames({
    [classes.dense]: dense,
  });

  return (
    <div className={className} {...other}>
      {primary && (
        typeof primary === 'string' ? (
          <Text type="subheading" className={classNameText}>
            {primary}
          </Text>
        ) : primary
      )}
      {secondary && (
        typeof secondary === 'string' ? (
          <Text secondary type="body1" className={classNameText}>
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
   * If true, the children will be indented by 72px.
   * This is useful if there is no left avatar or left icon.
   */
  dense: PropTypes.bool,
  inset: PropTypes.bool,
  primary: PropTypes.node,
  secondary: PropTypes.node,
};

ListItemText.defaultProps = {
  dense: false,
  primary: false,
  secondary: false,
  inset: false,
};

ListItemText.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
