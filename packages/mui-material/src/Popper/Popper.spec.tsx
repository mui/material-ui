import * as React from 'react';
import type { Instance } from '@popperjs/core';
import { expectType } from '@mui/types';
import Popper from '@mui/material/Popper';
import Tooltip from '@mui/material/Tooltip';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

function PopperComponentPropTest() {
  return (
    <div>
      <Popper open />
      <Popper
        open
        component="a"
        href="test"
        onClick={(event) => {
          expectType<React.MouseEvent<HTMLAnchorElement, MouseEvent>, typeof event>(event);
        }}
      />
      <Popper open component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error missing stringProp and numberProp */}
      <Popper open component={CustomComponent} />
    </div>
  );
}

interface Props {
  children: React.ReactElement<unknown>;
  value: number;
}

export default function ValueLabelComponent(props: Props) {
  const { children, value } = props;

  const popperRef = React.useRef<Instance>(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });

  return (
    <Tooltip
      slotProps={{
        popper: { popperRef },
      }}
      enterTouchDelay={0}
      placement="top"
      title={value}
    >
      {children}
    </Tooltip>
  );
}
