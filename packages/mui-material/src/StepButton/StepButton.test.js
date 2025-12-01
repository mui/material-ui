import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, screen, fireEvent, supportsTouch } from '@mui/internal-test-utils';
import StepButton, { stepButtonClasses as classes } from '@mui/material/StepButton';
import Step from '@mui/material/Step';
import StepLabel, { stepLabelClasses } from '@mui/material/StepLabel';
import ButtonBase from '@mui/material/ButtonBase';
import describeConformance from '../../test/describeConformance';

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
      const { container } = render(
        <Step active completed disabled>
          <StepButton>Step One</StepButton>
        </Step>,
      );

      const stepLabelRoot = container.querySelector(`.${stepLabelClasses.root}`);
      const stepLabel = container.querySelector(`.${stepLabelClasses.label}`);

      expect(stepLabelRoot).to.have.class(stepLabelClasses.disabled);
      expect(stepLabel).to.have.class(stepLabelClasses.active);
      expect(stepLabel).to.have.class(stepLabelClasses.completed);
      screen.getByText('Step One');
    });

    it('should pass props to a provided StepLabel', () => {
      const { container } = render(
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
      screen.getByText('Step One');
    });
  });

  it('should disable the button', () => {
    render(<StepButton disabled>Step One</StepButton>);

    expect(screen.getByRole('button')).to.have.property('disabled', true);
  });

  it('should have `aria-current=step` when active', () => {
    render(
      <Step active>
        <StepButton>Step One</StepButton>
      </Step>,
    );

    expect(screen.getByRole('button')).to.have.attribute('aria-current', 'step');
  });

  it('should not have `aria-current` when non-active', () => {
    render(
      <Step active={false}>
        <StepButton>Step One</StepButton>
      </Step>,
    );

    expect(screen.getByRole('button')).not.to.have.attribute('aria-current', 'step');
  });

  describe('event handlers', () => {
    it('should forward mouseenter, mouseleave and touchstart', function touchTests() {
      // only run in supported browsers
      if (!supportsTouch()) {
        this.skip();
      }

      const handleMouseEnter = spy();
      const handleMouseLeave = spy();
      const handleTouchStart = spy();

      render(
        <StepButton
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
        >
          Step One
        </StepButton>,
      );

      const button = screen.getByRole('button');

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
    render(
      <Step>
        <StepButton>Next</StepButton>
      </Step>,
    );

    expect(screen.getByRole('button')).not.to.equal(null);
  });
});
