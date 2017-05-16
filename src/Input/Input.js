// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import Textarea from './Textarea';

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
        bottom: -2,
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
      color: theme.palette.text.primary,
      width: '100%',
      '&:focus': {
        outline: 0,
      },
      '&::-webkit-search-decoration': { // Remove the padding when type=search.
        appearance: 'none',
      },
    },
    singleline: {
      appearance: 'textfield', // Improve type search style.
    },
    multiline: {
      resize: 'none',
      padding: 0,
    },
    multilineWrapper: {
      padding: '6px 0',
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
     * It's an `input` by default.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    /**
     * The default value of the `Input` element.
     */
    defaultValue: PropTypes.string,
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
    /*
     * @ignore
     */
    id: PropTypes.string,
    /**
     * The CSS class name of the input element.
     */
    inputClassName: PropTypes.string,
    /**
     * Properties applied to the `input` element.
     */
    inputProps: PropTypes.object,
    /**
     * If `true`, a textarea element will be rendered.
     */
    multiline: PropTypes.bool,
    /**
     * @ignore
     */
    name: PropTypes.string,
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
     * @ignore
     */
    onKeyDown: PropTypes.func,
    /**
     * @ignore
     */
    onKeyUp: PropTypes.func,
    /**
     * @ignore
     */
    placeholder: PropTypes.string,
    /**
     * Number of rows to display when multiline option is set to true.
     */
    rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Maxium number of rows to display when multiline option is set to true.
     */
    rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Type of the input element. It should be a valid HTML5 input type.
     */
    type: PropTypes.string,
    /**
     * The input value, required for a controlled component.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    disabled: false,
    type: 'text',
    disableUnderline: false,
    multiline: false,
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
  input = undefined;

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
      component,
      defaultValue,
      disabled,
      disableUnderline,
      error: errorProp,
      id,
      inputClassName: inputClassNameProp,
      inputProps: inputPropsProp,
      multiline,
      onBlur, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      onKeyDown,
      onKeyUp,
      placeholder,
      name,
      rows,
      rowsMax,
      type,
      value,
      ...other
    } = this.props;

    const { muiFormControl, styleManager } = this.context;
    const classes = styleManager.render(styleSheet);

    let error = errorProp;

    if (typeof error === 'undefined' && muiFormControl) {
      error = muiFormControl.error;
    }

    const wrapperClassName = classNames(classes.wrapper, {
      [classes.disabled]: disabled,
      [classes.error]: error,
      [classes.focused]: this.state.focused,
      [classes.formControl]: muiFormControl,
      [classes.inkbar]: !disableUnderline,
      [classes.multilineWrapper]: multiline,
      [classes.underline]: !disableUnderline,
    }, classNameProp);

    const inputClassName = classNames(classes.input, {
      [classes.disabled]: disabled,
      [classes.singleline]: !multiline,
      [classes.multiline]: multiline,
    }, inputClassNameProp);

    const required = muiFormControl && muiFormControl.required === true;

    let InputComponent = 'input';
    let inputProps = inputPropsProp;

    if (component) {
      inputProps = { rows, rowsMax, ...inputProps };
      InputComponent = component;
    } else if (multiline) {
      if (rows && !rowsMax) {
        inputProps = { rows, ...inputProps };
        InputComponent = 'textarea';
      } else {
        inputProps = { rows, rowsMax, ...inputProps };
        InputComponent = Textarea;
      }
    }

    return (
      <div className={wrapperClassName} {...other}>
        <InputComponent
          ref={(node) => { this.input = node; }}
          className={inputClassName}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          disabled={disabled}
          aria-required={required ? true : undefined}
          value={value}
          id={id}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          type={type}
          {...inputProps}
        />
      </div>
    );
  }
}
