// @flow weak

import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import { isDirty } from '../Input/Input';

export const styleSheet = createStyleSheet('MuiFormControl', theme => ({
  root: {
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'relative',
  },
  marginForm: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
  },
}));

/**
 * Provides context such as dirty/focused/error/required for form inputs.
 */
class FormControl extends Component {
  static defaultProps = {
    disabled: false,
    error: false,
    marginForm: false,
    required: false,
  };

  state = {
    dirty: false,
    focused: false,
  };

  getChildContext() {
    const { disabled, error, required } = this.props;
    const { dirty, focused } = this.state;

    return {
      muiFormControl: {
        dirty,
        disabled,
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

  componentWillMount() {
    // We need to iterate through the children and find the Input in order
    // to fully support server side rendering.
    Children.forEach(this.props.children, child => {
      if (child && child.type && child.type.muiName === 'Input' && isDirty(child.props, true)) {
        this.setState({ dirty: true });
      }
    });
  }

  handleFocus = event => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
    if (!this.state.focused) {
      this.setState({ focused: true });
    }
  };

  handleBlur = event => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
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
    const { children, classes, className, disabled, error, marginForm, ...other } = this.props;

    return (
      <div
        className={classNames(
          classes.root,
          {
            [classes.marginForm]: marginForm,
          },
          className,
        )}
        {...other}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
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
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label should be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, add the margin top and bottom required when used in a form.
   */
  marginForm: PropTypes.bool,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * If `true`, the label will indicate that the input is required.
   */
  required: PropTypes.bool,
};

FormControl.childContextTypes = {
  muiFormControl: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(FormControl);
