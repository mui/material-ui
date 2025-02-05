import * as React from 'react';
import { expectType } from '@mui/types';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import { PaperProps } from '@mui/material/Paper';

const paperProps: PaperProps<'span'> = {
  component: 'span',
  onClick: (event) => {
    expectType<React.MouseEvent<HTMLSpanElement, MouseEvent>, typeof event>(event);
  },
};
function Test() {
  return (
    <React.Fragment>
      <Dialog open />;
      <Dialog open PaperProps={paperProps} />;
    </React.Fragment>
  );
}

function Custom(props: DialogProps) {
  const { slotProps, ...dialogProps } = props;
  return (
    <Dialog
      slotProps={{
        ...slotProps,
        transition: (ownerState) => {
          const transitionProps =
            typeof slotProps?.transition === 'function'
              ? slotProps.transition(ownerState)
              : slotProps?.transition;
          return {
            ...transitionProps,
            onExited: (node) => {
              transitionProps?.onExited?.(node);
            },
          };
        },
      }}
      {...dialogProps}
    >
      test
    </Dialog>
  );
}
