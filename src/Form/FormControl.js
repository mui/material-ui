// @flow

import React, { Children, Component } from 'react';
import type { Element } from 'react';
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
  marginNormal: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
  },
  marginDense: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit / 2,
  },
  fullWidth: {
    width: '100%',
  },
}));

type DefaultProps = {
  disabled: boolean,
  error: boolean,
  fullWidth: boolean,
  margin: 'none',
  required: boolean,
};

type Props = DefaultProps & {
  /**
   * The contents of the form control.
   */
  children?: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   */
  disabled?: boolean,
  /**
   * If `true`, the label should be displayed in an error state.
   */
  error?: boolean,
  /**
   * If `true`, the label will take up the full width of its container.
   */
  fullWidth?: boolean,
  /**
   * @ignore
   */
  onBlur?: Function,
  /**
   * @ignore
   */
  onFocus?: Function,
  /**
   * If `true`, the label will indicate that the input is required.
   */
  required?: boolean,
  /**
   * If `dense` | `normal`, will adjust vertical spacing of this and contained components.
   */
  margin?: 'none' | 'dense' | 'normal',
};

type State = {
  dirty: boolean,
  focused: boolean,
};

/**
 * Provides context such as dirty/focused/error/required for form inputs.
 */
class FormControl extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    disabled: false,
    error: false,
    fullWidth: false,
    margin: 'none',
    required: false,
  };
  static childContextTypes = {
    muiFormControl: PropTypes.object.isRequired,
  };

  state: State = {
    dirty: false,
    focused: false,
  };

  getChildContext() {
    const { disabled, error, required, margin } = this.props;
    const { dirty, focused } = this.state;

    return {
      muiFormControl: {
        dirty,
        disabled,
        error,
        focused,
        margin,
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
    const {
      children,
      classes,
      className,
      disabled,
      error,
      fullWidth,
      margin,
      ...other
    } = this.props;

    return (
      <div
        className={classNames(
          classes.root,
          {
            [classes.marginNormal]: margin === 'normal',
            [classes.marginDense]: margin === 'dense',
            [classes.fullWidth]: fullWidth,
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

export default withStyles(styleSheet)(FormControl);
