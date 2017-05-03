// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'recompose/shallowEqual';
import Input, { InputLabel } from '../Input';
import customPropTypes from '../utils/customPropTypes';
import FormControl from '../Form/FormControl';

/**
 * ```
 * <TextField value="Hello World">
 * ```
 */
export default class TextField extends Component {
  static propTypes = {
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If `true`, the input will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If `true`, the label will be displayed in an error state.
     */
    error: PropTypes.bool,
    /*
     * @ignore
     */
    id: PropTypes.string,
    /**
     * The CSS class name of the `Input` element.
     */
    inputClassName: PropTypes.string,
    /**
     * Properties applied to the `Input` element.
     */
    inputProps: PropTypes.object,
    /**
     * The label content.
     */
    label: PropTypes.node,
    /**
     * The CSS class name of the label element.
     */
    labelClassName: PropTypes.string,
    /**
     * Name attribute of the `Input` element.
     */
    name: PropTypes.string,
    /**
     * If `true`, the label is displayed as required.
     */
    required: PropTypes.bool,
    /**
     * Type attribute of the `Input` element. It should be a valid HTML5 input type.
     */
    type: PropTypes.string,
    /**
     * The value of the `Input` element, required for a controlled component.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    required: false,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.context.styleManager.theme, nextContext.styleManager.theme)
    );
  }

  render() {
    const {
      className,
      disabled,
      error,
      inputClassName,
      inputProps,
      label,
      labelClassName,
      name,
      required,
      type,
      value,
      ...other
    } = this.props;

    return (
      <FormControl
        className={className}
        error={error}
        required={required}
        {...other}
      >
        {label && (
          <InputLabel className={labelClassName}>
            {label}
          </InputLabel>
        )}
        <Input
          className={inputClassName}
          value={value}
          name={name}
          type={type}
          disabled={disabled}
          {...inputProps}
        />
      </FormControl>
    );
  }
}
