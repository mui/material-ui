// @flow

import React from 'react';
import type { ChildrenArray, ComponentType } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { isDirty } from '../Input/Input';
import { isMuiComponent } from '../utils/reactHelpers';

export const styles = (theme: Object) => ({
  root: {
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'relative',
    // Reset fieldset default style
    minWidth: 0,
    padding: 0,
    margin: 0,
    border: 0,
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
});

type DefaultProps = {
  disabled: boolean,
  classes: Object,
  component: string,
  error: boolean,
  fullWidth: boolean,
  margin: 'none',
  required: boolean,
};

export type Props = {
  /**
   * The contents of the form control.
   */
  children?: ChildrenArray<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: string | ComponentType<*>,
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

type AllProps = DefaultProps & Props;

type State = {
  dirty: boolean,
  focused: boolean,
};

/**
 * Provides context such as dirty/focused/error/required for form inputs.
 */
class FormControl extends React.Component<AllProps, State> {
  props: AllProps;

  static defaultProps = {
    classes: {},
    component: 'div',
    disabled: false,
    error: false,
    fullWidth: false,
    margin: 'none',
    required: false,
  };

  static childContextTypes = {
    muiFormControl: PropTypes.object.isRequired,
  };

  state = {
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
    const { children } = this.props;
    if (children) {
      React.Children.forEach(children, child => {
        if (isMuiComponent(child, 'Input') && isDirty(child.props, true)) {
          this.setState({ dirty: true });
        }
      });
    }
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
      component: ComponentProp,
      disabled,
      error,
      fullWidth,
      margin,
      ...other
    } = this.props;

    return (
      <ComponentProp
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
      </ComponentProp>
    );
  }
}

export default withStyles(styles, { name: 'MuiFormControl' })(FormControl);
