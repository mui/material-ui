// @flow weak

import React, { Component, PropTypes } from 'react';
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
}, { index: 10 });

export default class ListItemText extends Component {
  static propTypes = {
    className: PropTypes.string,
    primary: PropTypes.node,
    secondary: PropTypes.node,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      className: classNameProp,
      primary,
      secondary,
      ...other,
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
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
}
