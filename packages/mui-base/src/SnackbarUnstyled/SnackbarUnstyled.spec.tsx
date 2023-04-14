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

function SnackbarUnstyledWithCustomRoot(props: SnackbarUnstyledProps) {
  return <SnackbarUnstyled {...props} slots={{ root: Root }} />;
}
