import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiStepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

interface Props {
  labels: string[];
  orientation?: 'vertical' | 'horizontal';
  activeStep: number;
}

export const Stepper: React.SFC<Props> = (props: Props) => {
  const { labels, orientation, activeStep } = props;
  return (
    <MuiStepper orientation={orientation} activeStep={activeStep}>
      {labels.map((label) => (
        <Step>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </MuiStepper>
  );
};

Stepper.defaultProps = {
  labels: ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'],
};

export default Stepper;

addPropertyControls(Stepper, {
  labels: {
    type: ControlType.Array,
    title: 'Labels',
    propertyControl: { type: ControlType.String },
  },
  orientation: {
    type: ControlType.Enum,
    title: 'Variant',
    options: ['vertical', 'horizontal'],
  },
  activeStep: {
    type: ControlType.Number,
    title: 'Active step',
    min: 0,
    step: 1,
    defaultValue: 0,
  },
});
