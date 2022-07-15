import * as React from 'react';
import OptionGroupUnstyled, {
  OptionGroupUnstyledLabelSlotProps,
  OptionGroupUnstyledListSlotProps,
  OptionGroupUnstyledRootSlotProps,
} from '@mui/base/OptionGroupUnstyled';

const Root = React.forwardRef(function Root(
  props: OptionGroupUnstyledRootSlotProps,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  return <li {...props} ref={ref} />;
});

const Label = React.forwardRef(function Label(
  props: OptionGroupUnstyledLabelSlotProps,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  return <li {...props} ref={ref} />;
});

const List = React.forwardRef(function List(
  props: OptionGroupUnstyledListSlotProps,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  return <li {...props} ref={ref} />;
});

const option = <OptionGroupUnstyled components={{ Root, Label, List }} />;
