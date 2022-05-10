import * as React from 'react';
import OptionUnstyled, { OptionUnstyledRootSlotProps } from '@mui/base/OptionUnstyled';

const Root = React.forwardRef(function Root<TValue>(
  props: OptionUnstyledRootSlotProps<TValue>,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  const { ownerState, ...other } = props;

  return <li data-selected={ownerState.selected} {...other} ref={ref} />;
});

const option = <OptionUnstyled value={null} components={{ Root }} />;
