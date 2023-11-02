import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepButton from '@mui/joy/StepButton';
import StepIndicator from '@mui/joy/StepIndicator';
import Check from '@mui/icons-material/Check';

export default function ButtonStepper() {
  const [activeStep, setActiveStep] = React.useState(1);
  return (
    <Stepper sx={{ width: '100%' }}>
      <Step
        indicator={
          <StepIndicator
            variant={activeStep === 0 ? 'soft' : 'solid'}
            color="primary"
          >
            {activeStep <= 0 ? 1 : <Check />}
          </StepIndicator>
        }
        sx={{
          '&::after': { ...(activeStep > 0 && { bgcolor: 'primary.solidBg' }) },
        }}
      >
        <StepButton onClick={() => setActiveStep(0)}>Order placed</StepButton>
      </Step>
      <Step
        indicator={
          <StepIndicator
            variant={activeStep <= 1 ? 'soft' : 'solid'}
            color={activeStep < 1 ? 'neutral' : 'primary'}
          >
            {activeStep <= 1 ? 2 : <Check />}
          </StepIndicator>
        }
        sx={{
          '&::after': { ...(activeStep > 1 && { bgcolor: 'primary.solidBg' }) },
        }}
      >
        <StepButton onClick={() => setActiveStep(1)}>In review</StepButton>
      </Step>
      <Step
        indicator={
          <StepIndicator
            variant={activeStep <= 2 ? 'soft' : 'solid'}
            color={activeStep < 2 ? 'neutral' : 'primary'}
          >
            {activeStep <= 2 ? 3 : <Check />}
          </StepIndicator>
        }
      >
        <StepButton onClick={() => setActiveStep(2)}>Approved</StepButton>
      </Step>
    </Stepper>
  );
}
