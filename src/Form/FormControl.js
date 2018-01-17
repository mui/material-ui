import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { isDirty, isAdornedStart } from '../Input/Input';
import { isMuiElement } from '../utils/reactHelpers';

export const styles = theme => ({
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
class FormControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    // We need to iterate through the children and find the Input in order
    // to fully support server side rendering.
    const { children } = this.props;
    if (children) {
      React.Children.forEach(children, child => {
        if (isMuiElement(child, ['Input', 'Select']) && isDirty(child.props, true)) {
          this.state.dirty = true;
        }
        if (isMuiElement(child, ['Input']) && isAdornedStart(child.props)) {
          this.state.adornedStart = true;
        }
      });
    }
  }

  state = {
    adornedStart: false,
    dirty: false,
    focused: false,
  };

  getChildContext() {
    const { disabled, error, required, margin } = this.props;
    const { adornedStart, dirty, focused } = this.state;

    return {
      muiFormControl: {
        adornedStart,
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

  handleFocus = event => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
    this.setState(state => (!state.focused ? { focused: true } : null));
  };

  handleBlur = event => {
    // The event might be undefined.
    // For instance, a child component might call this hook
    // when an input is disabled but still having the focus.
    if (this.props.onBlur && event) {
      this.props.onBlur(event);
    }
    this.setState(state => (state.focused ? { focused: false } : null));
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
      classes,
      className,
      component: Component,
      disabled,
      error,
      fullWidth,
      margin,
      ...other
    } = this.props;

    return (
      <Component
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
      />
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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label should be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the component, as well as its children,
   * will take up the full width of its container.
   */
  fullWidth: PropTypes.bool,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   */
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
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

FormControl.defaultProps = {
  component: 'div',
  disabled: false,
  error: false,
  fullWidth: false,
  margin: 'none',
  required: false,
};

FormControl.childContextTypes = {
  muiFormControl: PropTypes.object.isRequired,
};

export default withStyles(styles, { name: 'MuiFormControl' })(FormControl);
