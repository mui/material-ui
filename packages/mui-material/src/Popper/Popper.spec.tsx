import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Instance } from '@popperjs/core';

interface Props {
  children: React.ReactElement;
  value: number;
}

export default function ValueLabelComponent(props: Props) {
  const { children, value } = props;

  const popperRef = React.useRef<Instance | null>(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });

  return (
    <Tooltip
      PopperProps={{
        popperRef,
      }}
      enterTouchDelay={0}
      placement="top"
      title={value}
    >
      {children}
    </Tooltip>
  );
}
