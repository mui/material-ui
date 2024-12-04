import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepButton from '@mui/joy/StepButton';
import StepIndicator from '@mui/joy/StepIndicator';
import Check from '@mui/icons-material/Check';

const steps = ['Order placed', 'In review', 'Approved'];

export default function ButtonStepper() {
  const [activeStep, setActiveStep] = React.useState(1);
  return (
    <Stepper sx={{ width: '100%' }}>
      {steps.map((step, index) => (
        <Step
          key={step}
          indicator={
            <StepIndicator
              variant={activeStep <= index ? 'soft' : 'solid'}
              color={activeStep < index ? 'neutral' : 'primary'}
            >
              {activeStep <= index ? index + 1 : <Check />}
            </StepIndicator>
          }
          sx={[
            activeStep > index &&
              index !== 2 && { '&::after': { bgcolor: 'primary.solidBg' } },
          ]}
        >
          <StepButton onClick={() => setActiveStep(index)}>{step}</StepButton>
        </Step>
      ))}
    </Stepper>
  );
}
