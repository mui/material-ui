import * as React from 'react';
import ModalUnstyled, { ModalUnstyledRootSlotProps } from '@mui/base/ModalUnstyled';

const Root = React.forwardRef(function Root(
  props: ModalUnstyledRootSlotProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-keepmounted={ownerState.keepMounted} {...other} ref={ref} />;
});

const styledModal = (
  <ModalUnstyled open components={{ Root }}>
    <div />
  </ModalUnstyled>
);
