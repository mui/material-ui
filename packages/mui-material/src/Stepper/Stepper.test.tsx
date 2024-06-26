import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import Step, { StepProps, stepClasses } from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepContent, { stepContentClasses } from '@mui/material/StepContent';
import Stepper, { stepperClasses as classes } from '@mui/material/Stepper';
import describeConformance from '../../test/describeConformance';

describe('<Stepper />', () => {
  const { render } = createRenderer();

  describeConformance(
    <Stepper>
      <Step />
    </Stepper>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      muiName: 'MuiStepper',
      refInstanceof: window.HTMLDivElement,
      testVariantProps: { variant: 'foo' },
      testStateOverrides: { prop: 'alternativeLabel', value: true, styleKey: 'alternativeLabel' },
      skip: ['componentsProp'],
    }),
  );

  describe('rendering children', () => {
    it('renders 3 Step and 2 StepConnector components', () => {
      const { container } = render(
        <Stepper>
          <Step />
          <Step />
          <Step />
        </Stepper>,
      );

      const connectors = container.querySelectorAll(`.${stepConnectorClasses.root}`);
      const steps = container.querySelectorAll(`.${stepClasses.root}`);

      expect(connectors).to.have.length(2);
      expect(steps).to.have.length(3);
    });
  });

  describe('controlling child props', () => {
    it('controls children linearly based on the activeStep prop', () => {
      const { container, setProps } = render(
        <Stepper activeStep={0}>
          <Step />
          <Step />
          <Step />
        </Stepper>,
      );

      const steps = container.querySelectorAll(`.${stepClasses.root}`);
      const connectors = container.querySelectorAll(`.${stepConnectorClasses.root}`);

      expect(steps[0]).not.to.have.class(stepClasses.completed);
      expect(steps[1]).not.to.have.class(stepClasses.completed);
      expect(steps[2]).not.to.have.class(stepClasses.completed);
      expect(connectors[0]).to.have.class(stepConnectorClasses.disabled);
      expect(connectors[1]).to.have.class(stepConnectorClasses.disabled);

      setProps({ activeStep: 1 });

      expect(steps[0]).to.have.class(stepClasses.completed);
      expect(steps[1]).not.to.have.class(stepClasses.completed);
      expect(steps[2]).not.to.have.class(stepClasses.completed);
      expect(connectors[0]).not.to.have.class(stepConnectorClasses.disabled);
      expect(connectors[0]).to.have.class(stepConnectorClasses.active);
      expect(connectors[1]).to.have.class(stepConnectorClasses.disabled);
    });

    it('controls children non-linearly based on the activeStep prop', () => {
      const { container, setProps } = render(
        <Stepper nonLinear activeStep={0}>
          <Step />
          <Step />
          <Step />
        </Stepper>,
      );

      const steps = container.querySelectorAll(`.${stepClasses.root}`);
      const connectors = container.querySelectorAll(`.${stepConnectorClasses.root}`);

      expect(steps[0]).not.to.have.class(stepClasses.completed);
      expect(steps[1]).not.to.have.class(stepClasses.completed);
      expect(steps[2]).not.to.have.class(stepClasses.completed);
      expect(connectors[0]).not.to.have.class(stepConnectorClasses.disabled);
      expect(connectors[1]).not.to.have.class(stepConnectorClasses.disabled);

      setProps({ activeStep: 1 });

      expect(steps[0]).not.to.have.class(stepClasses.completed);
      expect(steps[1]).not.to.have.class(stepClasses.completed);
      expect(steps[2]).not.to.have.class(stepClasses.completed);
      expect(connectors[0]).not.to.have.class(stepConnectorClasses.disabled);
      expect(connectors[0]).to.have.class(stepConnectorClasses.active);
      expect(connectors[1]).not.to.have.class(stepConnectorClasses.disabled);

      setProps({ activeStep: 2 });

      expect(steps[0]).not.to.have.class(stepClasses.completed);
      expect(steps[1]).not.to.have.class(stepClasses.completed);
      expect(steps[2]).not.to.have.class(stepClasses.completed);
      expect(connectors[0]).not.to.have.class(stepConnectorClasses.disabled);
      expect(connectors[1]).not.to.have.class(stepConnectorClasses.disabled);
      expect(connectors[1]).to.have.class(stepConnectorClasses.active);
    });

    it('passes index down correctly when rendering children containing arrays', () => {
      function CustomStep({ index }: StepProps) {
        return <div data-index={index} data-testid="step" />;
      }

      const { getAllByTestId } = render(
        <Stepper nonLinear>
          <CustomStep />
          {[<CustomStep key={1} />, <CustomStep key={2} />]}
        </Stepper>,
      );

      const steps = getAllByTestId('step');

      expect(steps[0]).to.have.attribute('data-index', '0');
      expect(steps[1]).to.have.attribute('data-index', '1');
      expect(steps[2]).to.have.attribute('data-index', '2');
    });
  });

  describe('step connector', () => {
    it('should have a default step connector', () => {
      const { container } = render(
        <Stepper>
          <Step />
          <Step />
        </Stepper>,
      );

      const connectors = container.querySelectorAll(`.${stepConnectorClasses.root}`);

      expect(connectors).to.have.length(1);
    });

    it('should allow the developer to specify a custom step connector', () => {
      function CustomConnector() {
        return <div className="CustomConnector" />;
      }
      const { container } = render(
        <Stepper connector={<CustomConnector />}>
          <Step />
          <Step />
        </Stepper>,
      );

      const defaultConnectors = container.querySelectorAll(`.${stepConnectorClasses.root}`);
      const customConnectors = container.querySelectorAll('.CustomConnector');

      expect(defaultConnectors).to.have.length(0);
      expect(customConnectors).to.have.length(1);
    });

    it('should allow the step connector to be removed', () => {
      const { container } = render(
        <Stepper connector={null}>
          <Step />
          <Step />
        </Stepper>,
      );

      const connectors = container.querySelectorAll(`.${stepConnectorClasses.root}`);

      expect(connectors).to.have.length(0);
    });

    it('should pass active prop to connector when second step is active', () => {
      const { container } = render(
        <Stepper activeStep={1}>
          <Step />
          <Step />
        </Stepper>,
      );

      const connector = container.querySelector(`.${stepConnectorClasses.root}`);

      expect(connector).to.have.class(stepConnectorClasses.active);
    });

    it('should pass completed prop to connector when second step is completed', () => {
      const { container } = render(
        <Stepper activeStep={2}>
          <Step />
          <Step />
        </Stepper>,
      );

      const connector = container.querySelector(`.${stepConnectorClasses.root}`);

      expect(connector).to.have.class(stepConnectorClasses.completed);
    });

    it('should pass correct active and completed props to the StepConnector with nonLinear prop', () => {
      const steps = ['Step1', 'Step2', 'Step3'];

      const { container } = render(
        <Stepper orientation="horizontal" nonLinear connector={<StepConnector />}>
          {steps.map((label, index) => (
            <Step key={label} active completed={index === 2}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>,
      );

      const connectors = container.querySelectorAll(`.${stepConnectorClasses.root}`);

      expect(connectors).to.have.length(2);
      expect(connectors[0]).to.have.class(stepConnectorClasses.active);
      expect(connectors[0]).not.to.have.class(stepConnectorClasses.completed);

      expect(connectors[1]).to.have.class(stepConnectorClasses.active);
      expect(connectors[1]).to.have.class(stepConnectorClasses.completed);
    });
  });

  it('renders with a null child', () => {
    const { container } = render(
      <Stepper>
        <Step />
        {null}
      </Stepper>,
    );

    const steps = container.querySelectorAll(`.${stepClasses.root}`);

    expect(steps).to.have.length(1);
  });

  it('should hide the last connector', () => {
    const { container } = render(
      <Stepper orientation="vertical">
        <Step>
          <StepLabel>one</StepLabel>
          <StepContent />
        </Step>
        <Step>
          <StepLabel>two</StepLabel>
          <StepContent />
        </Step>
      </Stepper>,
    );

    const stepContent = container.querySelectorAll(`.${stepContentClasses.root}`);

    expect(stepContent[0]).not.to.have.class(stepContentClasses.last);
    expect(stepContent[1]).to.have.class(stepContentClasses.last);
  });

  it('should apply non-linear class', () => {
    const { container } = render(
      <Stepper nonLinear activeStep={0}>
        <Step />
        <Step />
        <Step />
      </Stepper>,
    );

    const stepper = container.querySelector(`.${classes.root}`);
    expect(stepper).to.have.class(classes.nonLinear);
  });
});
