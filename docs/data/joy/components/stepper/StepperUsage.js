import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import Typography from '@mui/joy/Typography';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Check from '@mui/icons-material/Check';

export default function StepperUsage() {
  return (
    <JoyUsageDemo
      componentName="Stepper"
      data={[
        {
          propName: 'stepperOrientation',
          knob: 'radio',
          defaultValue: 'horizontal',
          options: ['horizontal', 'vertical'],
        },
        {
          propName: 'stepOrientation',
          knob: 'radio',
          defaultValue: 'horizontal',
          options: ['horizontal', 'vertical'],
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
        {
          propName: 'indicator',
          knob: 'switch',
          defaultValue: true,
        },
      ]}
      getCodeBlock={(code, props) => `<Stepper${
        props.orientation === 'vertical' ? ' orientation="vertical"' : ''
      }>
  <Step${props.stepOrientation === 'vertical' ? ` orientation="vertical"` : ''}${
    props.indicator
      ? `
    indicator={
      <StepIndicator variant="solid" color="primary">
        <Check />
      </StepIndicator>
    }\n  `
      : ''
  }>First</Step>
  ...
</Stepper>`}
      renderDemo={({ stepperOrientation, stepOrientation, size, indicator }) => (
        <Stepper
          orientation={stepperOrientation}
          size={size}
          sx={{ width: 320, mb: 3, py: 3 }}
        >
          <Step
            orientation={stepOrientation}
            indicator={
              indicator && (
                <StepIndicator variant="solid" color="primary">
                  <Check />
                </StepIndicator>
              )
            }
          >
            <Typography sx={{ bgcolor: 'background.body' }}>First</Typography>
          </Step>
          <Step
            orientation={stepOrientation}
            indicator={indicator && <StepIndicator color="primary">2</StepIndicator>}
          >
            <Typography sx={{ bgcolor: 'background.body' }}>Second</Typography>
          </Step>
        </Stepper>
      )}
    />
  );
}
