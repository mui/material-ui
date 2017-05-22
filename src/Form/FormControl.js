// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet('MuiFormControl', {
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
  },
});

/**
 * Provides context such as dirty/focused/error/required for form inputs.
 */
class FormControl extends Component {
  static defaultProps = {
    error: false,
    required: false,
  };

  state = {
    dirty: false,
    focused: false,
  };

  getChildContext() {
    const { error, required } = this.props;
    const { dirty, focused } = this.state;

    return {
      muiFormControl: {
        dirty,
        error,
        focused,
        required,
        onDirty: this.handleDirty,
        onClean: this.handleClean,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
      },
    };
  }

  handleFocus = () => {
    if (!this.state.focused) {
      this.setState({ focused: true });
    }
  };

  handleBlur = () => {
    if (this.state.focused) {
      this.setState({ focused: false });
    }
  };

  handleDirty = () => {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  };

  handleClean = () => {
    if (this.state.dirty) {
      this.setState({ dirty: false });
    }
  };

  render() {
    const {
      children,
      classes,
      className,
      error, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    return (
      <div
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        className={classNames(classes.root, className)}
        {...other}
      >
        {children}
      </div>
    );
  }
}

FormControl.propTypes = {
  /**
   * The contents of the form control.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the label should be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the label will indicate that the input is required.
   */
  required: PropTypes.bool,
};

FormControl.childContextTypes = {
  muiFormControl: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(FormControl);
