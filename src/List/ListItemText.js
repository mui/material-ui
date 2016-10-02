// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import Text from '../Text';

export const styleSheet = createStyleSheet('ListItemText', (theme) => {
  return {
    root: {
      flex: '1 1 auto',
      padding: '0 16px',
      '&:first-child': {
        paddingLeft: 0,
      },
    },
    secondary: {
      color: theme.palette.text.secondary,
    },
  };
}, { index: -5 });

export default function ListItemText(props, context) {
  const {
    className: classNameProp,
    primary,
    secondary,
    ...other,
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.root, classNameProp);

  return (
    <div className={className} {...other}>
      {primary && (
        typeof primary === 'string' ? (
          <Text type="subheading">{primary}</Text>
        ) : { primary }
      )}
      {secondary && (
        typeof secondary === 'string' ? (
          <Text className={classes.secondary} type="body1">{secondary}</Text>
        ) : { secondary }
      )}
    </div>
  );
}

ListItemText.propTypes = {
  className: PropTypes.string,
  primary: PropTypes.node,
  secondary: PropTypes.node,
};

ListItemText.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
