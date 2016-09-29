// @flow weak

import React, { Component, cloneElement, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import { easing } from '../styles/transitions';
import { createChainedFunction } from '../utils/helpers';

export const styleSheet = createStyleSheet('TextField', (theme) => {
  const focusColor = theme.palette.accent.A200;

  return {
    root: {
      display: 'flex',
      position: 'relative',
      marginTop: 16,
      // Expanding underline
      '&:after': {
        backgroundColor: focusColor,
        left: 0,
        bottom: 9,
        content: '\'\'',
        height: 2,
        position: 'absolute',
        width: '100%',
        transform: 'scaleX(0)',
        transition: theme.transitions.create(
          'transform',
          '200ms',
          null,
          easing.easeOut
        ),
      },
    },
    label: {},
    input: {
      display: 'block',
      marginTop: 10,
      marginBottom: 10,
      width: '100%',
      zIndex: 1,
    },
    focused: {
      '& $label': {
        color: focusColor,
      },
      '&:after': {
        transform: 'scaleX(1)',
      },
    },
  };
}, { index: -5 });

/**
 * TextField
 *
 * @see https://material.google.com/components/text-fields.html
 *
 * ```js
 * import TextField from 'material-ui/TextField';
 *
 * const Component = () => <TextField value="Hello World">;
 * ```
 */
export default class TextField extends Component {
  static propTypes = {
    /**
     * The contents of the `TextField`
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Whether this text field is required.
     */
    required: PropTypes.bool,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    dirty: false,
    focused: false,
  };

  classes = {};

  handleFocus = () => this.setState({ focused: true });
  handleBlur = () => this.setState({ focused: false });

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

  renderChild = (child) => {
    const { muiName } = child.type;

    if (muiName === 'TextFieldInput') {
      return this.renderInput(child);
    } else if (muiName === 'TextFieldLabel') {
      return this.renderLabel(child);
    }

    return child;
  };

  renderInput = (input) =>
    cloneElement(input, {
      className: classNames(this.classes.input, input.props.className),
      onDirty: this.handleDirty,
      onClean: this.handleClean,
      onFocus: createChainedFunction(this.handleFocus, input.props.onFocus),
      onBlur: createChainedFunction(this.handleBlur, input.props.onBlur),
    });

  renderLabel = (label) =>
    cloneElement(label, {
      className: classNames(this.classes.label, label.props.className),
      dirty: this.state.dirty,
      shrink: label.props.hasOwnProperty('shrink') ? // Shrink the label if dirty or focused
        label.props.shrink : (this.state.dirty || this.state.focused),
      required: this.props.required,
    });

  render() {
    const {
      children,
      className: classNameProp,
      ...other,
    } = this.props;

    this.classes = this.context.styleManager.render(styleSheet);

    const className = classNames({
      [this.classes.root]: true,
      [this.classes.focused]: this.state.focused,
    }, classNameProp);

    return (
      <div className={className} {...other}>
        {React.Children.map(children, this.renderChild)}
      </div>
    );
  }
}
