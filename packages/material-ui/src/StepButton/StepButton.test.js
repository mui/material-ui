import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import { createClientRender } from 'test/utils/createClientRender';
import { fireEvent } from '@testing-library/dom';
import describeConformance from '../test-utils/describeConformance';
import StepButton from './StepButton';
import Step from '../Step';
import StepLabel from '../StepLabel';
import ButtonBase from '../ButtonBase';

describe('<StepButton />', () => {
  let classes;
  let stepLabelClasses;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<StepButton />);
    stepLabelClasses = getClasses(<StepLabel />);
  });

  describe('internals', () => {
    const mount = createMount();

    describeConformance(<StepButton />, () => ({
      classes,
      inheritComponent: ButtonBase,
      mount,
      refInstanceof: window.HTMLButtonElement,
      skip: ['componentProp'],
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

  describe('event handlers', () => {
    it('should forward mouseenter, mouseleave and touchstart', function touchTests() {
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
});
