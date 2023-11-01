import * as React from 'react';
import Box from '@mui/joy/Box';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';

export default function StepperVariables() {
  return (
    <JoyVariablesDemo
      componentName="Stepper"
      renderCode={(formattedSx) =>
        `<Stepper${formattedSx ? `${formattedSx}>` : '>'}`
      }
      data={[
        {
          var: '--Step-connectorThickness',
          defaultValue: '2px',
        },
        {
          var: '--Step-connectorInset',
          defaultValue: '6px',
        },
        {
          var: '--Step-connectorRadius',
        },
        {
          var: '--Step-gap',
          defaultValue: '6px',
        },
        {
          var: '--StepIndicator-size',
          defaultValue: '32px',
        },
        [
          'Vertical Stepper',
          [
            {
              var: '--Stepper-verticalGap',
              defaultValue: '12px',
            },
            {
              var: '--Step-indicatorDotSize',
              defaultValue: '6px',
            },
          ],
        ],
      ]}
      renderDemo={(sx) => (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 4,
            rowGap: 8,
            width: 320,
          }}
        >
          <Stepper sx={{ gridColumn: '1/-1', ...sx }}>
            <Step
              orientation="vertical"
              indicator={
                <StepIndicator variant="solid" color="neutral">
                  1
                </StepIndicator>
              }
            >
              Order placed
            </Step>
            <Step
              orientation="vertical"
              indicator={<StepIndicator>2</StepIndicator>}
            >
              Order shipped
            </Step>
          </Stepper>

          <Stepper orientation="vertical" sx={sx}>
            <Step>Order placed</Step>
            <Step>In review</Step>
            <Step>Approved</Step>
          </Stepper>

          <Stepper orientation="vertical" sx={sx}>
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
      )}
    />
  );
}
