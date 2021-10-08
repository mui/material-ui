import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { TransitionProps } from '@mui/material/transitions';

interface InvalidPopperProps {
  children: JSX.Element;
}

function InvalidPopper({ children }: InvalidPopperProps) {
  return <div>{children}</div>;
}

interface ValidPopperProps {
  children: (transitionProps: TransitionProps) => JSX.Element;
}

function ValidPopper({ children }: ValidPopperProps) {
  return <div>{children({})}</div>;
}

const tooltipWithInvalidPopper = (
  // @ts-expect-error
  <Tooltip components={{ Popper: InvalidPopper }} title="Test tooltip">
    <div />
  </Tooltip>
);

const tooltipWithHostPopper = (
  // @ts-expect-error
  <Tooltip components={{ Popper: 'div' }} title="Test tooltip">
    <div />
  </Tooltip>
);

const tooltipWithValidPopper = (
  <Tooltip components={{ Popper: ValidPopper }} title="Test tooltip">
    <div />
  </Tooltip>
);
