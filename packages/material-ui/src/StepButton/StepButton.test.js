import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import StepButton from './StepButton';
import Step from '../Step';
import StepLabel from '../StepLabel';
import ButtonBase from '../ButtonBase';
import { fireEvent } from '@testing-library/dom';

describe('<StepButton />', () => {
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<StepButton />);
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
      const wrapper = mount(
        <StepButton active completed disabled>
          Step One
        </StepButton>,
      );

      const stepLabel = wrapper.find(StepLabel);
      expect(stepLabel.props()).to.have.property('active', true);
      expect(stepLabel.props()).to.have.property('completed', true);
      expect(stepLabel.props()).to.have.property('disabled', true);
      expect(stepLabel.props()).to.have.property('children', 'Step One');
    });

    it('should pass props to a provided StepLabel', () => {
      const wrapper = mount(
        <StepButton active completed disabled label="Step One">
          <StepLabel>Step One</StepLabel>
        </StepButton>,
      );

      const stepLabel = wrapper.find(StepLabel);
      expect(stepLabel.props()).to.have.property('active', true);
      expect(stepLabel.props()).to.have.property('completed', true);
      expect(stepLabel.props()).to.have.property('disabled', true);
      expect(stepLabel.props()).to.have.property('children', 'Step One');
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
