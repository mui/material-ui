import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';

export default function BasicStepper() {
  return (
    <Stepper sx={{ width: '100%' }}>
      <Step>Step 1</Step>
      <Step>Step 2</Step>
      <Step>Step 3</Step>
    </Stepper>
  );
}
