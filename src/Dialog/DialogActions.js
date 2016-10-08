// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';

export const styleSheet = createStyleSheet('DialogActions', () => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: '8px 4px',
      flex: '0 0 auto',
    },
    action: {
      margin: '0 4px',
    },
    button: {
      minWidth: '64px',
    },
  };
});

export default class DialogActions extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  classes = {};

  renderButton = (button) => (
    <div className={this.classes.action}>
      {React.cloneElement(
        button,
        { className: classNames(this.classes.button, button.props.className) }
      )}
    </div>
  );

  render() {
    const {
      children,
      className,
      ...other,
    } = this.props;

    this.classes = this.context.styleManager.render(styleSheet);

    return (
      <div data-mui-test="DialogActions" className={classNames(this.classes.root, className)} {...other}>
        {React.Children.map(children, this.renderButton)}
      </div>
    );
  }
}
