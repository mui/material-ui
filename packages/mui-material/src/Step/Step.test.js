import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Step, { stepClasses as classes } from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel, { stepLabelClasses } from '@mui/material/StepLabel';
import StepButton, { stepButtonClasses } from '@mui/material/StepButton';
import describeConformance from '../../test/describeConformance';

describe('<Step />', () => {
  const { render } = createRenderer();

  describeConformance(<Step />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiStep',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLDivElement,
    skip: ['componentsProp'],
  }));

  it('merges styles and other props into the root node', () => {
    render(
      <Step
        index={1}
        style={{ paddingRight: 200, color: 'purple', border: '1px solid tomato' }}
        data-testid="root"
        orientation="horizontal"
      />,
    );

    const rootNode = screen.getByTestId('root');
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
      render(
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

      const stepLabel = screen.getByText('Step 3');
      expect(stepLabel).to.have.class(stepLabelClasses.active);
    });

    it('overrides "completed" context value', () => {
      render(
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

      const stepLabel = screen.getByText('Step 3');
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

  describe('accessibility', () => {
    it('should not have aria-label by default (relies on StepLabel visually hidden text)', () => {
      const { container } = render(
        <Stepper activeStep={0}>
          <Step>
            <StepLabel>Step 1</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 2</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 3</StepLabel>
          </Step>
        </Stepper>,
      );

      const steps = container.querySelectorAll(`.${classes.root}`);
      // No aria-label by default to avoid redundancy with visually hidden text
      expect(steps[0]).not.to.have.attribute('aria-label');
      expect(steps[1]).not.to.have.attribute('aria-label');
      expect(steps[2]).not.to.have.attribute('aria-label');
    });

    it('should use custom getAriaLabel when provided', () => {
      const { container } = render(
        <Stepper activeStep={0}>
          <Step getAriaLabel={(index, totalSteps) => `Item ${index + 1} of ${totalSteps}`}>
            <StepLabel>First</StepLabel>
          </Step>
          <Step getAriaLabel={(index, totalSteps) => `Item ${index + 1} of ${totalSteps}`}>
            <StepLabel>Second</StepLabel>
          </Step>
        </Stepper>,
      );

      const steps = container.querySelectorAll(`.${classes.root}`);
      expect(steps[0]).to.have.attribute('aria-label', 'Item 1 of 2');
      expect(steps[1]).to.have.attribute('aria-label', 'Item 2 of 2');
    });
  });
});
