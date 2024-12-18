import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import { mergeSlotProps } from '@mui/material/utils';

export const CustomTooltip = (props: TooltipProps) => {
  const { children, title, sx: sxProps } = props;

  return (
    <Tooltip
      {...props}
      title={<Box sx={{ p: 4 }}>{title}</Box>}
      slotProps={{
        ...props.slotProps,
        popper: mergeSlotProps(props.slotProps?.popper, {
          className: 'custom-tooltip',
          disablePortal: true,
          placement: 'top',
        }),
      }}
    >
      {children}
    </Tooltip>
  );
};

export const CustomTooltip2 = (props: TooltipProps) => {
  const { children, title, sx: sxProps } = props;

  // to ensure that the return type of `mergeSlotProps` is correctly inferred
  const popperProps = mergeSlotProps(props.slotProps?.popper, {
    className: 'custom-tooltip',
    disablePortal: true,
    placement: 'top',
  });
  return (
    <Tooltip
      {...props}
      title={<Box sx={{ p: 4 }}>{title}</Box>}
      slotProps={{
        ...props.slotProps,
        popper: popperProps,
      }}
    >
      {children}
    </Tooltip>
  );
};
