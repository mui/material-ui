import * as React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import PopperJs from 'popper.js';

interface Props {
  children: React.ReactElement;
  value: number;
}

export default function ValueLabelComponent(props: Props) {
  const { children, value } = props;

  const popperRef = React.useRef<PopperJs | null>(null);
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
