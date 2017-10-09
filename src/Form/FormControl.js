// @flow

import React from 'react';
import type { ElementType, Node } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { isDirty } from '../Input/Input';
import { isMuiElement } from '../utils/reactHelpers';

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

export type Margin = 'none' | 'dense' | 'normal';

type ProvidedProps = {
  disabled: boolean,
  classes: Object,
  component: ElementType,
  error: boolean,
  fullWidth: boolean,
  margin: Margin,
  required: boolean,
};

export type Props = {
  /**
   * The contents of the form control.
   */
  children?: Node,
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
  component?: ElementType,
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   */
  disabled?: boolean,
  /**
   * If `true`, the label should be displayed in an error state.
   */
  error?: boolean,
  /**
   * If `true`, the component, as well as its children,
   * will take up the full width of its container.
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
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   */
  margin?: Margin,
};

type State = {
  dirty: boolean,
  focused: boolean,
};

/**
 * Provides context such as dirty/focused/error/required for form inputs.
 * Relying on the context provides high flexibilty and ensures that the state always stay
 * consitent across the children of the `FormControl`.
 * This context is used by the following components:
 *  - FormLabel
 *  - FormHelperText
 *  - Input
 *  - InputLabel
 */
class FormControl extends React.Component<ProvidedProps & Props, State> {
  static defaultProps = {
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
        if (isMuiElement(child, ['Input', 'Select']) && isDirty(child.props, true)) {
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
