import * as React from 'react';
import { expectType } from '@mui/types';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Grow from '@mui/material/Grow';
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
      <Drawer open />;
      <Drawer open PaperProps={paperProps} />;
    </React.Fragment>
  );
}

<Drawer
  slotProps={{
    root: {
      disablePortal: true,
    },
    backdrop: {
      transitionDuration: 1000,
    },
    paper: {
      elevation: 4,
    },
    docked: {
      'aria-hidden': true,
    },
    transition: {
      timeout: 500,
    },
  }}
/>;

function Noop() {
  return null;
}
<Drawer
  slots={{
    root: 'div',
    backdrop: Noop,
    docked: 'div',
    paper: 'div',
    transition: Grow,
  }}
/>;

function Custom(props: DrawerProps) {
  const { slotProps, ...dialogProps } = props;
  return (
    <Drawer
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
    </Drawer>
  );
}
