// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiDialogActions', () => {
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
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  classes = {};

  renderButton = (button) => (
    <div className={this.classes.action}>
      {React.cloneElement(
        button,
        { className: classNames(this.classes.button, button.props.className) },
      )}
    </div>
  );

  render() {
    const {
      children,
      className,
      ...other
    } = this.props;

    this.classes = this.context.styleManager.render(styleSheet);

    return (
      <div
        data-mui-test="DialogActions"
        className={classNames(this.classes.root, className)}
        {...other}
      >
        {React.Children.map(children, this.renderButton)}
      </div>
    );
  }
}
