import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import StepButton from './StepButton';
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
    let mount;

    before(() => {
      mount = createMount({ strict: true });
    });

    after(() => {
      mount.cleanUp();
    });

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
    it('should forward mouseenter, mouseleave and touchstart', () => {
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
      fireEvent.touchStart(button, { touches: [{}] });

      expect(handleMouseEnter).to.have.property('callCount', 1);
      expect(handleMouseLeave).to.have.property('callCount', 1);
      expect(handleTouchStart).to.have.property('callCount', 1);

      fireEvent.mouseOver(button);
      fireEvent.touchStart(button, { touches: [{}] });

      expect(handleMouseEnter).to.have.property('callCount', 2);
      expect(handleMouseLeave).to.have.property('callCount', 1);
      expect(handleTouchStart).to.have.property('callCount', 2);
    });
  });
});
