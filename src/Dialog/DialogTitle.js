import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('DialogTitle', (theme) => {
  const gutter = 24;
  return {
    root: {
      margin: 0,
      padding: `${gutter}px ${gutter}px 20px ${gutter}px`,
      fontSize: theme.typography.title.fontSize,
      lineHeight: '32px',
      fontWeight: 400,
    },
  };
});

export default class DialogTitle extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      children,
      className,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div className={ClassNames(classes.root, className)} {...other}>{children}</div>
    );
  }
}
