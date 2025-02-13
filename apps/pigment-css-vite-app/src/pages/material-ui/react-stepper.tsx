import * as React from 'react';
import MaterialUILayout from '../../Layout';
import CustomizedSteppers from '../../../../../docs/data/material/components/steppers/CustomizedSteppers.tsx';
import DotsMobileStepper from '../../../../../docs/data/material/components/steppers/DotsMobileStepper.tsx';
import HorizontalLinearAlternativeLabelStepper from '../../../../../docs/data/material/components/steppers/HorizontalLinearAlternativeLabelStepper.tsx';
import HorizontalLinearStepper from '../../../../../docs/data/material/components/steppers/HorizontalLinearStepper.tsx';
import HorizontalNonLinearStepper from '../../../../../docs/data/material/components/steppers/HorizontalNonLinearStepper.tsx';
import HorizontalStepperWithError from '../../../../../docs/data/material/components/steppers/HorizontalStepperWithError.tsx';
import ProgressMobileStepper from '../../../../../docs/data/material/components/steppers/ProgressMobileStepper.tsx';
import TextMobileStepper from '../../../../../docs/data/material/components/steppers/TextMobileStepper.tsx';
import VerticalLinearStepper from '../../../../../docs/data/material/components/steppers/VerticalLinearStepper.tsx';

export default function Steppers() {
  return (
    <MaterialUILayout>
      <h1>Steppers</h1>
      <section>
        <h2> Customized Steppers</h2>
        <div className="demo-container">
          <CustomizedSteppers />
        </div>
      </section>
      <section>
        <h2> Dots Mobile Stepper</h2>
        <div className="demo-container">
          <DotsMobileStepper />
        </div>
      </section>
      <section>
        <h2> Horizontal Linear Alternative Label Stepper</h2>
        <div className="demo-container">
          <HorizontalLinearAlternativeLabelStepper />
        </div>
      </section>
      <section>
        <h2> Horizontal Linear Stepper</h2>
        <div className="demo-container">
          <HorizontalLinearStepper />
        </div>
      </section>
      <section>
        <h2> Horizontal Non Linear Stepper</h2>
        <div className="demo-container">
          <HorizontalNonLinearStepper />
        </div>
      </section>
      <section>
        <h2> Horizontal Stepper With Error</h2>
        <div className="demo-container">
          <HorizontalStepperWithError />
        </div>
      </section>
      <section>
        <h2> Progress Mobile Stepper</h2>
        <div className="demo-container">
          <ProgressMobileStepper />
        </div>
      </section>
      <section>
        <h2> Text Mobile Stepper</h2>
        <div className="demo-container">
          <TextMobileStepper />
        </div>
      </section>
      <section>
        <h2> Vertical Linear Stepper</h2>
        <div className="demo-container">
          <VerticalLinearStepper />
        </div>
      </section>
    </MaterialUILayout>
  );
}
