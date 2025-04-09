import * as React from 'react';
import { expectType } from '@mui/types';
import { mergeSlotProps } from '@mui/material/utils';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

<Tooltip title="Hello">
  <button type="button">Hover or touch me</button>
</Tooltip>;

const SlotComponentRef = React.forwardRef<HTMLDivElement>((props, ref) => {
  return <div />;
});

<Tooltip
  title="Hello"
  slots={{
    popper: 'div',
    arrow: 'span',
    tooltip: 'div',
    transition: 'div',
  }}
  slotProps={{
    popper: {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    },
    arrow: {
      'aria-hidden': true,
    },
    tooltip: {},
    transition: {
      timeout: 500,
    },
  }}
>
  <button type="button">Hover or touch me</button>
</Tooltip>;

<Tooltip
  title="foo"
  slots={{
    popper: SlotComponentRef,
    arrow: SlotComponentRef,
    tooltip: SlotComponentRef,
    transition: SlotComponentRef,
  }}
>
  <button type="button">Hover or touch me</button>
</Tooltip>;

function Custom(props: TooltipProps) {
  const { slotProps, ...other } = props;
  return (
    <Tooltip
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
      {...other}
    />
  );
}

function Custom2(props: TooltipProps) {
  const { slotProps, ...other } = props;
  return (
    <Tooltip
      slotProps={{
        ...slotProps,
        transition: mergeSlotProps(slotProps?.transition, {
          onExited: (node) => {
            expectType<HTMLElement, typeof node>(node);
          },
        }),
      }}
      {...other}
    />
  );
}
