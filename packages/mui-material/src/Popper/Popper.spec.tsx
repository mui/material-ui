import * as React from 'react';
import { Instance } from '@popperjs/core';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  children: React.ReactElement<any>;
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
