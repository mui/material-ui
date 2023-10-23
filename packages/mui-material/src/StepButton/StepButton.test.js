import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, describeConformance } from '@mui-internal/test-utils';
import { fireEvent } from '@testing-library/dom';
import StepButton, { stepButtonClasses as classes } from '@mui/material/StepButton';
import Step from '@mui/material/Step';
import { stepIconClasses as iconClasses } from '@mui/material/StepIcon';
import StepLabel, { stepLabelClasses } from '@mui/material/StepLabel';
import ButtonBase from '@mui/material/ButtonBase';

describe('<StepButton />', () => {
  const { render } = createRenderer();

  describe('internals', () => {
    describeConformance(<StepButton />, () => ({
      classes,
      inheritComponent: ButtonBase,
      muiName: 'MuiStepButton',
      refInstanceof: window.HTMLButtonElement,
      render,
      skip: ['componentProp', 'componentsProp', 'themeVariants'],
    }));

    it('passes active, completed, disabled to StepLabel', () => {
      const { container, getByText } = render(
        <Step active completed disabled>
          <StepButton>Step One</StepButton>
        </Step>,
      );

      const stepLabelRoot = container.querySelector(`.${stepLabelClasses.root}`);
      const stepLabel = container.querySelector(`.${stepLabelClasses.label}`);

      expect(stepLabelRoot).to.have.class(stepLabelClasses.disabled);
      expect(stepLabel).to.have.class(stepLabelClasses.active);
      expect(stepLabel).to.have.class(stepLabelClasses.completed);
      getByText('Step One');
    });

    it('should pass props to a provided StepLabel', () => {
      const { container, getByText } = render(
        <Step active completed disabled>
          <StepButton label="Step One">
            <StepLabel>Step One</StepLabel>
          </StepButton>
        </Step>,
      );

      const stepLabelRoot = container.querySelector(`.${stepLabelClasses.root}`);
      const stepLabel = container.querySelector(`.${stepLabelClasses.label}`);

      expect(stepLabelRoot).to.have.class(stepLabelClasses.disabled);
      expect(stepLabel).to.have.class(stepLabelClasses.active);
      expect(stepLabel).to.have.class(stepLabelClasses.completed);
      getByText('Step One');
    });
  });

  it('should disable the button', () => {
    const { getByRole } = render(<StepButton disabled>Step One</StepButton>);

    expect(getByRole('button')).to.have.property('disabled', true);
  });

  it('should have `aria-current=step` when active', () => {
    const { getByRole } = render(
      <Step active>
        <StepButton>Step One</StepButton>
      </Step>,
    );

    expect(getByRole('button')).to.have.attribute('aria-current', 'step');
  });

  it('should not have `aria-current` when non-active', () => {
    const { getByRole } = render(
      <Step active={false}>
        <StepButton>Step One</StepButton>
      </Step>,
    );

    expect(getByRole('button')).not.to.have.attribute('aria-current', 'step');
  });

  describe('event handlers', () => {
    it('should forward mouseenter, mouseleave and touchstart', function touchTests() {
      // only run in supported browsers
      if (typeof Touch === 'undefined') {
        this.skip();
      }

      const handleMouseEnter = spy();
      const handleMouseLeave = spy();
      const handleTouchStart = spy();
      const { getByRole } = render(
        <StepButton
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
        >
          Step One
        </StepButton>,
      );
      const button = getByRole('button');

      fireEvent.mouseOver(button);

      expect(handleMouseEnter).to.have.property('callCount', 1);
      expect(handleMouseLeave).to.have.property('callCount', 0);
      expect(handleTouchStart).to.have.property('callCount', 0);

      fireEvent.mouseOut(button);

      expect(handleMouseEnter).to.have.property('callCount', 1);
      expect(handleMouseLeave).to.have.property('callCount', 1);
      expect(handleTouchStart).to.have.property('callCount', 0);

      // fake touch
      const firstTouch = new Touch({ identifier: 0, target: button });
      fireEvent.touchStart(button, { touches: [firstTouch] });

      expect(handleMouseEnter).to.have.property('callCount', 1);
      expect(handleMouseLeave).to.have.property('callCount', 1);
      expect(handleTouchStart).to.have.property('callCount', 1);

      fireEvent.mouseOver(button);
      const secondTouch = new Touch({ identifier: 1, target: button });
      fireEvent.touchStart(button, { touches: [firstTouch, secondTouch] });

      expect(handleMouseEnter).to.have.property('callCount', 2);
      expect(handleMouseLeave).to.have.property('callCount', 1);
      expect(handleTouchStart).to.have.property('callCount', 2);
    });
  });

  it('can be used as a child of `Step`', () => {
    // a simple smoke test to check that these two
    // integrate without any errors/warnings
    // TODO: move into integration test for Stepper component
    const { getByRole } = render(
      <Step>
        <StepButton>Next</StepButton>
      </Step>,
    );

    expect(getByRole('button')).not.to.equal(null);
  });

  describe('prop: StepIconComponent', () => {
    it('should render', () => {
      function CustomizedIcon() {
        return <div data-testid="custom-icon" />;
      }
      const { container, getByTestId } = render(
        <Step active completed>
          <StepButton StepIconComponent={CustomizedIcon}>Step One</StepButton>
        </Step>,
      );

      const icon = container.querySelector(`.${stepLabelClasses.iconContainer}`);

      getByTestId('custom-icon');
      expect(icon).not.to.equal(null);
      expect(icon).not.to.have.attribute('data-testid').equal('CheckCircleIcon');
    });

    it('should not render', () => {
      const { container } = render(
        <Step active completed>
          <StepButton>Step One</StepButton>
        </Step>,
      );

      const icon = container.querySelector(`.${iconClasses.root}`);
      expect(icon).to.equal(null);
    });

    describe('renders <StepIcon> with the className completed', () => {
      it('renders with completed className when completed', () => {
        function CustomizedIcon() {
          return <div data-testid="custom-icon" />;
        }
        const { container } = render(
          <Step completed>
            <StepButton StepIconComponent={CustomizedIcon}>Step One</StepButton>
          </Step>,
        );
  
        const icon = container.querySelector(`.${stepLabelClasses.iconContainer}`);
        expect(icon).to.have.class(stepLabelClasses.completed);
      });
    });

    describe('renders <StepIcon> with the className active', () => {
      it('renders with active className when active', () => {
        function CustomizedIcon() {
          return <div data-testid="custom-icon" />;
        }
        const { container } = render(
          <Step active>
            <StepLabel StepIconComponent={CustomizedIcon}>Step One</StepLabel>
          </Step>,
        );
  
        const icon = container.querySelector(`.${stepLabelClasses.iconContainer}`);
        expect(icon).to.have.class(stepLabelClasses.active);
      });
    });
  });
});
