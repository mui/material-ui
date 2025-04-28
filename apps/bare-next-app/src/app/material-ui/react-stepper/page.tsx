'use client';
import * as React from 'react';
import CustomizedSteppers from '../../../../../../docs/data/material/components/steppers/CustomizedSteppers';
import DotsMobileStepper from '../../../../../../docs/data/material/components/steppers/DotsMobileStepper';
import HorizontalLinearAlternativeLabelStepper from '../../../../../../docs/data/material/components/steppers/HorizontalLinearAlternativeLabelStepper';
import HorizontalLinearStepper from '../../../../../../docs/data/material/components/steppers/HorizontalLinearStepper';
import HorizontalNonLinearStepper from '../../../../../../docs/data/material/components/steppers/HorizontalNonLinearStepper';
import HorizontalStepperWithError from '../../../../../../docs/data/material/components/steppers/HorizontalStepperWithError';
import ProgressMobileStepper from '../../../../../../docs/data/material/components/steppers/ProgressMobileStepper';
import TextMobileStepper from '../../../../../../docs/data/material/components/steppers/TextMobileStepper';
import VerticalLinearStepper from '../../../../../../docs/data/material/components/steppers/VerticalLinearStepper';

export default function Steppers() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
