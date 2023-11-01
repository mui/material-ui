import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';

export default function IndicatorTopStepper() {
  return (
    <Stepper sx={{ width: '100%' }}>
      <Step
        orientation="vertical"
        indicator={
          <StepIndicator variant="solid" color="neutral">
            1
          </StepIndicator>
        }
      >
        Order placed
      </Step>
      <Step
        orientation="vertical"
        indicator={<StepIndicator variant="outlined">2</StepIndicator>}
      >
        In review
      </Step>
      <Step orientation="vertical" indicator={<StepIndicator>3</StepIndicator>}>
        Approved
      </Step>
    </Stepper>
  );
}
