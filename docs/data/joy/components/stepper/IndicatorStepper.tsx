import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';

export default function IndicatorStepper() {
  return (
    <Stepper sx={{ width: '100%' }}>
      <Step
        indicator={
          <StepIndicator variant="solid" color="neutral">
            1
          </StepIndicator>
        }
      >
        Order placed
      </Step>
      <Step indicator={<StepIndicator variant="outlined">2</StepIndicator>}>
        In review
      </Step>
      <Step indicator={<StepIndicator>3</StepIndicator>}>Approved</Step>
    </Stepper>
  );
}
