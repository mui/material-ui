import * as React from 'react';
import Box from '@mui/joy/Box';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';

export default function VerticalStepper() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
      <Stepper orientation="vertical" sx={{ width: 200 }}>
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

      <Stepper orientation="vertical" sx={{ width: 200 }}>
        <Step>Order placed</Step>
        <Step>In review</Step>
        <Step>Approved</Step>
      </Stepper>
    </Box>
  );
}
