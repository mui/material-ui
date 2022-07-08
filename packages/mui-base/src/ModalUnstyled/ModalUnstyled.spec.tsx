import * as React from 'react';
import ModalUnstyled, {
  ModalUnstyledRootSlotProps,
  ModalUnstyledBackdropSlotProps,
} from '@mui/base/ModalUnstyled';

function Root(props: ModalUnstyledRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-keepmounted={ownerState.keepMounted} {...other} />;
}

function Backdrop(props: ModalUnstyledBackdropSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-keepmounted={ownerState.keepMounted} {...other} />;
}

const styledModal = (
  <ModalUnstyled open components={{ Root, Backdrop }}>
    <div />
  </ModalUnstyled>
);
