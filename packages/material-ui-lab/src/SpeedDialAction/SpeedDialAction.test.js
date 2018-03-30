import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, getClasses } from 'material-ui/test-utils';
import Icon from 'material-ui/Icon';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import SpeedDialAction from './SpeedDialAction';

describe('<SpeedDialAction />', () => {
  let shallow;
  let classes;
  const icon = <Icon>add</Icon>;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<SpeedDialAction icon={icon} />);
  });

  it('should render a Tooltip', () => {
    const wrapper = shallow(<SpeedDialAction icon={icon} />);
    assert.strictEqual(wrapper.type(), Tooltip);
  });

  it('should render a Button', () => {
    const wrapper = shallow(<SpeedDialAction icon={icon} />);
    const buttonWrapper = wrapper.childAt(0);
    assert.strictEqual(buttonWrapper.type(), Button);
  });

  it('should render with the root class', () => {
    const wrapper = shallow(<SpeedDialAction icon={icon} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<SpeedDialAction className="mySpeedDialAction" icon={icon} />);
    assert.strictEqual(wrapper.hasClass('mySpeedDialAction'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render the Button with the button class', () => {
    const wrapper = shallow(<SpeedDialAction icon={icon} open />);
    const buttonWrapper = wrapper.childAt(0);
    assert.strictEqual(
      buttonWrapper.hasClass(classes.button),
      true,
      'should have the actionButton class',
    );
  });

  it('should render the Button with the button and buttonClosed classes', () => {
    const wrapper = shallow(<SpeedDialAction icon={icon} />);
    const buttonWrapper = wrapper.childAt(0);
    assert.strictEqual(
      buttonWrapper.hasClass(classes.button),
      true,
      'should have the button class',
    );
    assert.strictEqual(
      buttonWrapper.hasClass(classes.buttonClosed),
      true,
      'should have the buttonClosed class',
    );
  });

  describe('prop: onClick', () => {
    it('should be called when a click is triggered', () => {
      const handleClick = spy();
      const wrapper = shallow(<SpeedDialAction icon={icon} open onClick={handleClick} />);
      const buttonWrapper = wrapper.childAt(0);
      buttonWrapper.simulate('click');
      assert.strictEqual(handleClick.callCount, 1, 'it should forward the click event');
    });
  });

  // it('should call handleTooltipOpen & handleTooltipClose on mouseOver & blur', () => {
  //   const wrapper = shallow(<SpeedDialAction icon={icon} open />);
  //   const buttonWrapper = wrapper.childAt(0);
  //   assert.strictEqual(wrapper.state().tooltipOpen, false);
  //   buttonWrapper.simulate('mouseOver', {});
  //   assert.strictEqual(wrapper.state().tooltipOpen, true);
  //   buttonWrapper.simulate('blur', {});
  //   assert.strictEqual(wrapper.state().tooltipOpen, false);
  // });
});
