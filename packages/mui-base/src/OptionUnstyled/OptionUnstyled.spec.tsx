import * as React from 'react';
import OptionUnstyled from './OptionUnstyled';
import { OptionUnstyledRootSlotProps } from './OptionUnstyled.types';

const Root = React.forwardRef(function Root<TValue>(
  props: OptionUnstyledRootSlotProps<TValue>,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  const { ownerState, ...other } = props;

  return <li data-selected={ownerState.selected} {...other} ref={ref} />;
});

const option = <OptionUnstyled value={null} components={{ Root }} />;
