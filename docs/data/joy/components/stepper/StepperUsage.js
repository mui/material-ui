import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Check from '@mui/icons-material/Check';

export default function StepperUsage() {
  return (
    <JoyUsageDemo
      componentName="Stepper"
      data={[
        {
          propName: 'orientation',
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
  <Step${
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
      renderDemo={({ orientation, size, indicator }) => (
        <Stepper orientation={orientation} size={size} sx={{ width: 400, mb: 3 }}>
          <Step
            indicator={
              indicator && (
                <StepIndicator variant="solid" color="primary">
                  <Check />
                </StepIndicator>
              )
            }
          >
            First
          </Step>
          <Step
            indicator={indicator && <StepIndicator color="primary">2</StepIndicator>}
          >
            Second
          </Step>
          <Step
            indicator={
              indicator && <StepIndicator variant="outlined">3</StepIndicator>
            }
          >
            Third
          </Step>
        </Stepper>
      )}
    />
  );
}
