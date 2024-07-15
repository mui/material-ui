import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import Stack from '@mui/joy/Stack';

export default function SizesStepper() {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Stepper size="sm">
        <Step
          indicator={
            <StepIndicator variant="solid" color="neutral">
              1
            </StepIndicator>
          }
        >
          Order placed
        </Step>
        <Step indicator={<StepIndicator>2</StepIndicator>}>In review</Step>
        <Step indicator={<StepIndicator>3</StepIndicator>}>Approved</Step>
      </Stepper>

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
        <Step indicator={<StepIndicator>2</StepIndicator>}>In review</Step>
        <Step indicator={<StepIndicator>3</StepIndicator>}>Approved</Step>
      </Stepper>

      <Stepper size="lg" sx={{ width: '100%' }}>
        <Step
          indicator={
            <StepIndicator variant="solid" color="neutral">
              1
            </StepIndicator>
          }
        >
          Order placed
        </Step>
        <Step indicator={<StepIndicator>2</StepIndicator>}>In review</Step>
        <Step indicator={<StepIndicator>3</StepIndicator>}>Approved</Step>
      </Stepper>
    </Stack>
  );
}
