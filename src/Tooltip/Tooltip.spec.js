// @flow

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { Target, Popper } from 'react-popper';
import { createShallow, getClasses } from '../test-utils';
import Tooltip from './Tooltip';

describe('<Tooltip />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Tooltip label="Hello World">Hello World</Tooltip>);
  });

  it('should render a Manager', () => {
    const wrapper = shallow(<Tooltip label="Hello World">Hello World</Tooltip>);
    assert.strictEqual(wrapper.name(), 'Manager');
  });

  it('should render with the user, root and tooltip classes', () => {
    const wrapper = shallow(
      <Tooltip className="woofTooltip" label="Hello World">
        Hello World
      </Tooltip>,
    );
    assert.strictEqual(wrapper.hasClass('woofTooltip'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper
        .find(Popper)
        .childAt(0)
        .hasClass(classes.tooltip),
      true,
    );
  });

  it('should have top placement', () => {
    const wrapper = shallow(
      <Tooltip placement="top" label="Hello World">
        Hello World
      </Tooltip>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(
      wrapper
        .find(Popper)
        .childAt(0)
        .hasClass(classes.tooltip),
      true,
    );
    wrapper.childAt(0).simulate('click');
    assert.strictEqual(
      wrapper
        .find(Popper)
        .childAt(0)
        .hasClass(classes.tooltipTop),
      true,
    );
  });

  it('should call handleRequestClose & handleRequestOpen', () => {
    const wrapper = shallow(
      <Tooltip placement="top" label="Hello World">
        <button>Hello World</button>
      </Tooltip>,
    );
    assert.strictEqual(wrapper.state().open, false);
    wrapper
      .find(Target)
      .childAt(0)
      .simulate('mouseOver');
    assert.strictEqual(wrapper.state().open, true);
    wrapper
      .find(Target)
      .childAt(0)
      .simulate('blur');
    assert.strictEqual(wrapper.state().open, false);
  });

  it('should be controllable', () => {
    const handleRequestOpen = spy();
    const handleRequestClose = spy();

    const wrapper = shallow(
      <Tooltip
        placement="top"
        label="Hello World"
        open
        onRequestOpen={handleRequestOpen}
        onRequestClose={handleRequestClose}
      >
        <button>Hello World</button>
      </Tooltip>,
    );
    assert.strictEqual(handleRequestOpen.callCount, 0);
    assert.strictEqual(handleRequestClose.callCount, 0);
    wrapper
      .find(Target)
      .childAt(0)
      .simulate('mouseOver');
    assert.strictEqual(handleRequestOpen.callCount, 1);
    assert.strictEqual(handleRequestClose.callCount, 0);
    wrapper
      .find(Target)
      .childAt(0)
      .simulate('blur');
    assert.strictEqual(handleRequestOpen.callCount, 1);
    assert.strictEqual(handleRequestClose.callCount, 1);
  });
});
