import * as React from 'react';
import { expectType } from '@mui/types';
import { mergeSlotProps } from '@mui/material/utils';
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
  const { slotProps, ...other } = props;
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
      {...other}
    >
      test
    </StepContent>
  );
}

function Custom2(props: StepContentProps) {
  const { slotProps, ...other } = props;
  return (
    <StepContent
      slotProps={{
        ...slotProps,
        transition: mergeSlotProps(slotProps?.transition, {
          onExited: (node) => {
            expectType<HTMLElement, typeof node>(node);
          },
        }),
      }}
      {...other}
    >
      test
    </StepContent>
  );
}
