import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * @ignore - internal component.
 */
const NativeSelectInput = React.forwardRef(function NativeSelectInput(props, ref) {
  const {
    classes,
    className,
    disabled,
    IconComponent,
    inputRef,
    name,
    onChange,
    value,
    variant,
    ...other
  } = props;

  return (
    <div className={classes.root}>
      <select
        className={clsx(
          classes.select,
          {
            [classes.filled]: variant === 'filled',
            [classes.outlined]: variant === 'outlined',
            [classes.disabled]: disabled,
          },
          className,
        )}
        name={name}
        disabled={disabled}
        onChange={onChange}
        value={value}
        ref={inputRef || ref}
        {...other}
      />
      <IconComponent className={classes.icon} />
    </div>
  );
});

NativeSelectInput.propTypes = {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * The CSS class name of the select element.
   */
  className: PropTypes.string,
  /**
   * If `true`, the select will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: PropTypes.elementType,
  /**
   * Use that property to pass a ref callback to the native select element.
   * @deprecated
   */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback function fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   */
  onChange: PropTypes.func,
  /**
   * The input value.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

export default NativeSelectInput;
