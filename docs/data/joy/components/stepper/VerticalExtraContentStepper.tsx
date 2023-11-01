import * as React from 'react';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Chip from '@mui/joy/Chip';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';

export default function VerticalExtraContentStepper() {
  return (
    <Stepper orientation="vertical">
      <Step
        indicator={
          <StepIndicator variant="solid" color="primary">
            1
          </StepIndicator>
        }
      >
        <Typography>Billing Address</Typography>

        <Stack spacing={1}>
          <Typography level="body-sm">
            Ron Swanson <br />
            14 Lakeshore Drive <br />
            Pawnee, IN 12345 <br />
            United States <br />
            T: 555-555-5555
          </Typography>
          <ButtonGroup variant="plain" spacing={1}>
            <Chip
              color="primary"
              variant="solid"
              onClick={() => {
                // do something...
              }}
            >
              Next
            </Chip>
            <Chip
              color="neutral"
              variant="outlined"
              onClick={() => {
                // do something...
              }}
            >
              Edit
            </Chip>
          </ButtonGroup>
        </Stack>
      </Step>
      <Step indicator={<StepIndicator>2</StepIndicator>}>
        <div>
          <Typography level="title-sm">Shipping Address</Typography>
          <Typography level="body-xs">Pending</Typography>
        </div>
      </Step>
      <Step indicator={<StepIndicator>3</StepIndicator>}>
        <div>
          <Typography level="title-sm">Shipping Method</Typography>
          <Typography level="body-xs">Pending</Typography>
        </div>
      </Step>
    </Stepper>
  );
}
