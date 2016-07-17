import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';
import Text from '../Text';

export const styleSheet = createStyleSheet('ListItemText', (theme) => {
  return {
    root: {
      flex: '1 1 auto',
      padding: '0 16px',
    },
    secondary: {
      color: theme.palette.text.secondary,
    },
  };
});

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
    const { className, primary, secondary, ...other } = this.props;
    const classes = this.context.styleManager.render(styleSheet, { group: 'mui' });
    const classNames = ClassNames(classes.root, className);
    return (
      <div className={classNames} {...other}>
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
