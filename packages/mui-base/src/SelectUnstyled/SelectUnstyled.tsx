import * as React from 'react';
import PropTypes from 'prop-types';
import SelectUnstyledProps from './SelectUnstyledProps';
import MultiSelectUnstyled from './MultiSelectUnstyled';
import SingleSelectUnstyled from './SingleSelectUnstyled';

type SelectUnstyledComponentType = {
  <TValue extends {}>(
    props: SelectUnstyledProps<TValue>,
    ref: React.ForwardedRef<any>,
  ): JSX.Element;
  propTypes: any;
};

/**
 * The foundation for building custom-styled select components.
 *
 * Demos:
 *
 * - [Selects](https://mui.com/components/selects/)
 *
 * API:
 *
 * - [SelectUnstyled API](https://mui.com/api/select-unstyled/)
 */
const SelectUnstyled = React.forwardRef<SelectUnstyledProps<any>>(function SelectUnstyled<
  TValue extends {},
>(props: SelectUnstyledProps<TValue>, ref: React.ForwardedRef<any>) {
  if (props.multiple) {
    const { multiple, value, ...other } = props;
    return <MultiSelectUnstyled ref={ref} {...other} />;
  }

  const { multiple, ...other } = props;
  return <SingleSelectUnstyled ref={ref} {...other} />;
}) as SelectUnstyledComponentType;

SelectUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * If `true`, it will be possible to select multiple values.
   */
  multiple: PropTypes.bool,
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value: PropTypes.oneOfType([PropTypes.any, PropTypes.array]),
} as any;

export default SelectUnstyled;
