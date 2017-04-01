// @flow weak

import React, { Component, PropTypes } from 'react';
import shallowEqual from 'recompose/shallowEqual';
import { Input, InputLabel } from '../Input';
import customPropTypes from '../utils/customPropTypes';
import FormControl from '../Form/FormControl';

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
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Disabled attribute of the `<Input />` element. If `true`, the input will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Whether the label should be displayed in an error state.
     */
    error: PropTypes.bool,
    /*
     * @ignore
     */
    id: PropTypes.string,
    /**
     * The CSS class name of the `<Input />` element.
     */
    inputClassName: PropTypes.string,
    /**
     * Properties applied to the internal `<Input />` component.
     */
    inputProps: PropTypes.object,
    /**
     * The label text.
     */
    label: PropTypes.node,
    /**
     * The CSS class name of the label element.
     */
    labelClassName: PropTypes.string,
    /**
     * Name attribute of the `<Input />` element.
     */
    name: PropTypes.string,
    /**
     * Whether the label should be displayed as required (asterisk).
     */
    required: PropTypes.bool,
    /**
     * Type attribute of the `<Input />` element. It should be a valid HTML5 input type.
     */
    type: PropTypes.string,
    /**
     * Value attribute of the `<Input />` element, required for a controlled component.
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
