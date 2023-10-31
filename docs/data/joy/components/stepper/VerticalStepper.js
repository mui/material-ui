import * as React from 'react';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';

export default function VerticalStepper() {
  const [verticalGap, setVerticalGap] = React.useState(12);
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 2,
      }}
    >
      <FormControl sx={{ gridColumn: '1/-1' }}>
        <FormLabel>--Stepper-verticalGap</FormLabel>
        <Input
          type="number"
          endDecorator="px"
          value={verticalGap}
          onChange={(event) => {
            setVerticalGap(event.target.valueAsNumber);
          }}
        />
      </FormControl>

      <Stepper
        orientation="vertical"
        sx={{ width: 200, '--Stepper-verticalGap': `${verticalGap}px` }}
      >
        <Step>Order placed</Step>
        <Step>In review</Step>
        <Step>Approved</Step>
      </Stepper>

      <Stepper
        orientation="vertical"
        sx={{ width: 200, '--Stepper-verticalGap': `${verticalGap}px` }}
      >
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
    </Box>
  );
}
