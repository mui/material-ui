import * as React from 'react';
import StepContent, { StepContentProps } from '@mui/material/StepContent';
import Fade from '@mui/material/Fade';
import Collapse from '@mui/material/Collapse';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';

<StepContent TransitionComponent={Fade}>Step Content</StepContent>;
<StepContent TransitionComponent={Collapse}>Step Content</StepContent>;
<StepContent TransitionComponent={Grow}>Step Content</StepContent>;
<StepContent TransitionComponent={Slide}>Step Content</StepContent>;
<StepContent TransitionComponent={Zoom}>Step Content</StepContent>;

function Custom(props: StepContentProps) {
  const { slotProps, ...dialogProps } = props;
  return (
    <StepContent
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
    </StepContent>
  );
}
