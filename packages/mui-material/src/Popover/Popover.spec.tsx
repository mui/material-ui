import * as React from 'react';
import { expectType } from '@mui/types';
import { Popover, PaperProps, PopoverProps } from '@mui/material';

const paperProps: PaperProps<'span'> = {
  component: 'span',
  onClick: (event) => {
    expectType<React.MouseEvent<HTMLSpanElement, MouseEvent>, typeof event>(event);
  },
};
function Test() {
  return (
    <React.Fragment>
      <Popover open />;
      <Popover open PaperProps={paperProps} />
    </React.Fragment>
  );
}

<Popover
  open
  slotProps={{
    paper: {
      sx: (theme) => ({ backgroundColor: theme.palette.primary.main }),
    },
  }}
/>;

function Custom(props: PopoverProps) {
  const { slotProps, ...dialogProps } = props;
  return (
    <Popover
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
    </Popover>
  );
}
