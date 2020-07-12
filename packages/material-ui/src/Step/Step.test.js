import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import { createClientRender } from 'test/utils/createClientRender';
import describeConformance from '../test-utils/describeConformance';
import Step from './Step';
import Stepper from '../Stepper';
import StepLabel from '../StepLabel';
import StepButton from '../StepButton';

describe('<Step />', () => {
  let classes;
  let stepButtonClasses;
  let stepLabelClasses;
  const mount = createMount();

  const render = createClientRender();

  before(() => {
    classes = getClasses(<Step />);
    stepButtonClasses = getClasses(<StepButton />);
    stepLabelClasses = getClasses(<StepLabel />);
  });

  describeConformance(<Step />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('merges styles and other props into the root node', () => {
    const { getByTestId } = render(
      <Step
        index={1}
        style={{ paddingRight: 200, color: 'purple', border: '1px solid tomato' }}
        data-testid="root"
        orientation="horizontal"
      />,
    );

    const rootNode = getByTestId('root');
    expect(rootNode.style).to.have.property('paddingRight', '200px');
    expect(rootNode.style).to.have.property('color', 'purple');
    expect(rootNode.style).to.have.property('border', '1px solid tomato');
  });

  describe('rendering children', () => {
    it('renders children', () => {
      const { container } = render(
        <Step>
          <StepButton />
          <StepLabel />
        </Step>,
      );

      const stepLabel = container.querySelector(`.${stepLabelClasses.root}`);
      const stepButton = container.querySelector(`.${stepButtonClasses.root}`);
      expect(stepLabel).not.to.equal(null);
      expect(stepButton).not.to.equal(null);
    });

    it('should handle null children', () => {
      const { container } = render(
        <Step>
          <StepButton />
          {null}
        </Step>,
      );

      const stepButton = container.querySelector(`.${stepButtonClasses.root}`);
      expect(stepButton).not.to.equal(null);
    });
  });

  describe('overriding context props', () => {
    it('overrides "active" context value', () => {
      const { getByText } = render(
        <Stepper activeStep={1}>
          <Step>
            <StepLabel>Step 1</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 2</StepLabel>
          </Step>
          <Step active>
            <StepLabel>Step 3</StepLabel>
          </Step>
        </Stepper>,
      );

      const stepLabel = getByText('Step 3');
      expect(stepLabel).to.have.class(stepLabelClasses.active);
    });

    it('overrides "completed" context value', () => {
      const { getByText } = render(
        <Stepper activeStep={1}>
          <Step>
            <StepLabel>Step 1</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 2</StepLabel>
          </Step>
          <Step completed>
            <StepLabel>Step 3</StepLabel>
          </Step>
        </Stepper>,
      );

      const stepLabel = getByText('Step 3');
      expect(stepLabel).to.have.class(stepLabelClasses.completed);
    });

    it('overrides "disabled" context value', () => {
      const { container } = render(
        <Stepper activeStep={1}>
          <Step>
            <StepLabel>Step 1</StepLabel>
          </Step>
          <Step disabled>
            <StepLabel>Step 2</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 3</StepLabel>
          </Step>
        </Stepper>,
      );

      const stepLabels = container.querySelectorAll(`.${stepLabelClasses.root}`);
      expect(stepLabels[1]).to.have.class(stepLabelClasses.disabled);
    });
  });
});
