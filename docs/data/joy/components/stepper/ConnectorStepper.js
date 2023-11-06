import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import Stack from '@mui/joy/Stack';

export default function ConnectorStepper() {
  return (
    <Stack spacing={4} sx={{ width: '100%' }}>
      <Stepper>
        <Step
          sx={{
            '&::after': {
              height: 2,
              borderRadius: '24px',
              background:
                'linear-gradient(to right, #002f61, #00507b, #006e8e, #008b98, #00a79c)',
            },
          }}
        >
          Order placed
        </Step>
        <Step
          sx={{
            '&::after': {
              height: 2,
              borderRadius: '24px',
              background:
                'linear-gradient(to right, #00c395, #18dc82, #71ee65, #bbf942, #ffff00)',
            },
          }}
        >
          In review
        </Step>
        <Step>Approved</Step>
      </Stepper>
    </Stack>
  );
}
