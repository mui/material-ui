import * as React from 'react';
import StepLabel from '@mui/material/StepLabel';

const SlotComponentRef = React.forwardRef<HTMLDivElement>((props, ref) => {
  return <div />;
});

<StepLabel
  slots={{
    label: 'span',
    stepIcon: 'div',
  }}
>
  Step One
</StepLabel>;

<StepLabel slotProps={{ stepIcon: { completed: true, className: 'x' } }} />;
<StepLabel slotProps={{ stepIcon: (ownerState) => ({ error: ownerState.error }) }} />;
// @ts-expect-error
<StepLabel slotProps={{ stepIcon: { nonExistentProp: true } }} />;

<StepLabel
  slots={{
    label: SlotComponentRef,
    stepIcon: SlotComponentRef,
  }}
>
  Step One
</StepLabel>;
