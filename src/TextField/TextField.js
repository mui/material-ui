// @flow weak

import React, { Component, PropTypes } from 'react';
import shallowEqual from 'recompose/shallowEqual';
import { Input, InputLabel } from '../Input';
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
     * Whether the label should be displayed in an error state.
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
     * The label text.
     */
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /**
     * The CSS class name of the label element.
     */
    labelClassName: PropTypes.string,
    /**
     * Whether the label should be displayed as required (asterisk).
     */
    required: PropTypes.bool,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.context.styleManager.theme, nextContext.styleManager.theme)
    );
  }

  render() {
    const {
      error,
      className,
      inputClassName,
      label,
      labelClassName,
      required,
      ...other
    } = this.props;

    return (
      <FormControl
        className={className}
        error={error}
        required={required}
      >
        {label && (
          <InputLabel className={labelClassName}>
            {label}
          </InputLabel>
        )}
        <Input className={inputClassName} {...other} />
      </FormControl>
    );
  }
}
