// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

function isDirty(obj) {
  return obj && obj.value && obj.value.length > 0;
}

export const styleSheet = createStyleSheet('MuiInput', (theme) => {
  return {
    wrapper: {
      // Mimics the default input display property used by browsers for an input.
      display: 'inline-block',
      position: 'relative',
      fontFamily: theme.typography.fontFamily,
    },
    formControl: {
      marginTop: 10,
      marginBottom: 10,
    },
    inkbar: {
      '&:after': {
        backgroundColor: theme.palette.primary.A200,
        left: 0,
        bottom: -1,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        height: 2,
        position: 'absolute',
        right: 0,
        transform: 'scaleX(0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut,
        }),
      },
      '&$focused:after': {
        transform: 'scaleX(1)',
      },
    },
    focused: {},
    error: {
      '&:after': {
        backgroundColor: theme.palette.error[500],
        transform: 'scaleX(1)', // error is always underlined in red
      },
    },
    input: {
      font: 'inherit',
      padding: '6px 0',
      border: 0,
      display: 'block',
      verticalAlign: 'middle',
      whiteSpace: 'normal',
      background: 'none',
      margin: 0, // Reset for Safari
      appearance: 'textfield', // Improve type search style.
      color: theme.palette.text.primary,
      width: '100%',
      '&:focus': {
        outline: 0,
      },
      '&::-webkit-search-decoration': { // Remove the padding when type=search.
        appearance: 'none',
      },
    },
    disabled: {
      color: theme.palette.text.disabled,
      cursor: 'not-allowed',
    },
    underline: {
      borderBottom: `1px solid ${theme.palette.text.divider}`,
      '&$disabled': {
        borderBottomStyle: 'dotted',
      },
    },
  };
});

/**
 * Input
 */
export default class Input extends Component {
  static propTypes = {
    /**
     * The CSS class name of the wrapper element.
     */
    className: PropTypes.string,
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    /**
     * If `true`, the input will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If `true`, the input will not have an underline.
     */
    disableUnderline: PropTypes.bool,
    /**
     * If `true`, the input will indicate an error.
     */
    error: PropTypes.bool,
    /**
     * The CSS class name of the input element.
     */
    inputClassName: PropTypes.string,
    /**
     * @ignore
     */
    onBlur: PropTypes.func,
    /**
     * @ignore
     */
    onChange: PropTypes.func,
    /**
     * @ignore
     */
    onClean: PropTypes.func,
    /**
     * @ignore
     */
    onDirty: PropTypes.func,
    /**
     * @ignore
     */
    onFocus: PropTypes.func,
    /**
     * Type of the input element. It should be a valid HTML5 input type.
     */
    type: PropTypes.string,
    /**
     * If `true`, the input will have an underline.
     */
    underline: PropTypes.bool,
    /**
     * The input value, required for a controlled component.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    component: 'input',
    disabled: false,
    type: 'text',
    disableUnderline: false,
  };

  static contextTypes = {
    muiFormControl: PropTypes.object,
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    focused: false,
  };

  componentWillMount() {
    if (this.isControlled()) {
      this.checkDirty(this.props);
    }
  }

  componentDidMount() {
    if (!this.isControlled()) {
      this.checkDirty(this.input);
    }
  }

  componentWillUpdate(nextProps) {
    if (this.isControlled()) {
      this.checkDirty(nextProps);
    }
  }

  // Holds the input reference
  input = null;

  focus = () => this.input.focus();

  handleFocus = (event) => {
    this.setState({ focused: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleBlur = (event) => {
    this.setState({ focused: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  handleChange = (event) => {
    if (!this.isControlled()) {
      this.checkDirty(this.input);
    }
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  isControlled() {
    return typeof this.props.value === 'string';
  }

  checkDirty(obj) {
    const { muiFormControl } = this.context;

    if (isDirty(obj)) {
      if (muiFormControl && muiFormControl.onDirty) {
        muiFormControl.onDirty();
      }
      if (this.props.onDirty) {
        this.props.onDirty();
      }
      return;
    }

    if (muiFormControl && muiFormControl.onClean) {
      muiFormControl.onClean();
    }
    if (this.props.onClean) {
      this.props.onClean();
    }
  }

  render() {
    const {
      className: classNameProp,
      component: ComponentProp,
      inputClassName: inputClassNameProp,
      disabled,
      disableUnderline,
      error: errorProp,
      onBlur, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const { muiFormControl, styleManager } = this.context;
    const classes = styleManager.render(styleSheet);

    let error = errorProp;

    if (typeof error === 'undefined' && muiFormControl) {
      error = muiFormControl.error;
    }

    const wrapperClassName = classNames(classes.wrapper, {
      [classes.formControl]: muiFormControl,
      [classes.inkbar]: !disableUnderline,
      [classes.focused]: this.state.focused,
      [classes.error]: error,
    }, classNameProp);

    const inputClassName = classNames(classes.input, {
      [classes.underline]: !disableUnderline,
      [classes.disabled]: disabled,
    }, inputClassNameProp);

    const required = muiFormControl && muiFormControl.required === true;

    return (
      <div className={wrapperClassName}>
        <ComponentProp
          ref={(c) => { this.input = c; }}
          className={inputClassName}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          disabled={disabled}
          aria-required={required ? true : undefined}
          {...other}
        />
      </div>
    );
  }
}
