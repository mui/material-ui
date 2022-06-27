import * as React from 'react';
import SnackbarUnstyled, {
  SnackbarUnstyledProps,
  SnackbarUnstyledRootSlotProps,
} from '@mui/base/SnackbarUnstyled';

const Root = React.forwardRef(
  (props: SnackbarUnstyledRootSlotProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { ownerState, ...other } = props;
    return !ownerState.exited && ownerState.open ? (
      <div {...other} ref={ref}>
        Hello World
      </div>
    ) : null;
  },
);

const SnackbarUnstyledWithCustomRoot = (props: SnackbarUnstyledProps) => {
  return <SnackbarUnstyled {...props} components={{ Root }} />;
};
