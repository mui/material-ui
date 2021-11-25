import * as React from 'react';
import SelectUnstyledProps from './SelectUnstyledProps';
import MultiSelectUnstyled from './MultiSelectUnstyled';
import SingleSelectUnstyled from './SingleSelectUnstyled';

function SelectUnstyledUnforwarded<TValue extends {}>(
  props: SelectUnstyledProps<TValue>,
  ref: React.ForwardedRef<any>,
) {
  if (props.multiple) {
    const { multiple, ...other } = props;
    return <MultiSelectUnstyled ref={ref} {...other} />;
  }

  const { multiple, ...other } = props;
  return <SingleSelectUnstyled ref={ref} {...other} />;
}

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
const SelectUnstyled = React.forwardRef(
  SelectUnstyledUnforwarded as any,
) as typeof SelectUnstyledUnforwarded;

export default SelectUnstyled;
